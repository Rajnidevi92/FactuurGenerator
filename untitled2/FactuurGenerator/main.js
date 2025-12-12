// main.js - complete app logic
// Assumes helpers.js provides generateInvoiceHTML(company, employee, invoiceInfo, rows, hourly, kmRate, logo) and generatePDF(htmlString)

// -------------------- Utility: localStorage for employers --------------------
function loadEmployers() {
    return JSON.parse(localStorage.getItem('fg_employers') || '{}');
}
function saveEmployers(obj) {
    localStorage.setItem('fg_employers', JSON.stringify(obj));
}
function setSelectedEmployer(id) {
    localStorage.setItem('fg_selected_employer', id);
}
function getSelectedEmployer() {
    return localStorage.getItem('fg_selected_employer') || '';
}

// -------------------- Years management --------------------
function listYearsFromStorage() {
    const keys = Object.keys(localStorage);
    const years = new Set();
    keys.forEach(k => {
        const m = k.match(/^fg_declarations_(\d{4})$/);
        if (m) years.add(m[1]);
    });
    const current = new Date().getFullYear().toString();
    years.add(current);
    return Array.from(years).sort((a, b) => b - a); // newest first
}
function getSelectedYear() {
    return document.getElementById('year-select').value;
}
function setSelectedYear(y) {
    document.getElementById('year-select').value = y;
}

// -------------------- UI: employer select --------------------
function refreshEmployerSelect() {
    const select = document.getElementById('employer-select');
    select.innerHTML = '';
    const employers = loadEmployers();
    const ids = Object.keys(employers);
    if (ids.length === 0) {
        const opt = document.createElement('option'); opt.value = ''; opt.text = '-- geen werkgevers --';
        select.appendChild(opt);
        loadSelectedEmployerToForm('');
        return;
    }
    ids.forEach(id => {
        const opt = document.createElement('option'); opt.value = id; opt.text = `${id} — ${employers[id].name || ''}`;
        select.appendChild(opt);
    });
    const sel = getSelectedEmployer();
    if (sel && employers[sel]) select.value = sel;
    else select.value = ids[0];
    loadSelectedEmployerToForm(select.value);
}

function loadSelectedEmployerToForm(id) {
    const employers = loadEmployers();
    const e = employers[id] || null;
    if (e) {
        document.getElementById('employer-id').value = id;
        document.getElementById('company-name').value = e.name || '';
        document.getElementById('company-contact').value = e.contact || '';
        document.getElementById('company-address').value = e.address || '';
        document.getElementById('company-kvk').value = e.kvk || '';
        document.getElementById('company-bank').value = e.bank || '';
        document.getElementById('company-btw').value = e.btw || '';
        if (e.logo) document.body.dataset.fgLogo = e.logo;
        else delete document.body.dataset.fgLogo;
        setSelectedEmployer(id);
    } else {
        // clear form
        document.getElementById('employer-id').value = '';
        document.getElementById('company-name').value = '';
        document.getElementById('company-contact').value = '';
        document.getElementById('company-address').value = '';
        document.getElementById('company-kvk').value = '';
        document.getElementById('company-bank').value = '';
        document.getElementById('company-btw').value = '';
        delete document.body.dataset.fgLogo;
        setSelectedEmployer('');
    }
}

function saveEmployerFromForm() {
    const id = (document.getElementById('employer-id').value || '').trim();
    if (!id) {
        alert('Voer een korte ID in voor de werkgever (bijv. PZC).');
        return;
    }
    const employers = loadEmployers();
    employers[id] = {
        name: document.getElementById('company-name').value || '',
        contact: document.getElementById('company-contact').value || '',
        address: document.getElementById('company-address').value || '',
        kvk: document.getElementById('company-kvk').value || '',
        bank: document.getElementById('company-bank').value || '',
        btw: document.getElementById('company-btw').value || '',
        logo: localStorage.getItem('fg_logo_base64_for_' + id) || (document.body.dataset.fgLogo || null)
    };
    saveEmployers(employers);
    setSelectedEmployer(id);
    refreshEmployerSelect();
    refreshDeclarationDropdown();
    updateDashboard();
    alert('Werkgever opgeslagen.');
}

function deleteSelectedEmployer() {
    const id = document.getElementById('employer-select').value;
    if (!id) { alert('Geen werkgever geselecteerd.'); return; }
    if (!confirm(`Verwijder werkgever ${id}? Dit verwijdert ook het opgeslagen logo.`)) return;
    const employers = loadEmployers();
    delete employers[id];
    saveEmployers(employers);
    localStorage.removeItem('fg_logo_base64_for_' + id);
    refreshEmployerSelect();
    refreshDeclarationDropdown();
    updateDashboard();
    alert('Werkgever verwijderd.');
}

// employer logo upload (per employer)
const employerLogoInput = document.getElementById('employer-logo-input');
if (employerLogoInput) {
    employerLogoInput.addEventListener('change', (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            const base64 = ev.target.result;
            const id = (document.getElementById('employer-id').value || '').trim();
            if (!id) {
                alert('Sla eerst de werkgever op met een ID voordat je een logo toekent.');
                return;
            }
            try {
                localStorage.setItem('fg_logo_base64_for_' + id, base64);
                document.body.dataset.fgLogo = base64;
                const employers = loadEmployers();
                employers[id] = employers[id] || {};
                employers[id].logo = base64;
                saveEmployers(employers);
                alert('Logo opgeslagen voor werkgever ' + id);
            } catch (err) {
                alert('Kan logo niet opslaan (bestand mogelijk te groot).');
            }
        };
        reader.readAsDataURL(f);
    });
}

// -------------------- Years UI --------------------
function refreshYearSelect() {
    const sel = document.getElementById('year-select');
    sel.innerHTML = '';
    const years = listYearsFromStorage();
    years.forEach(y => {
        const opt = document.createElement('option');
        opt.value = y; opt.text = y;
        sel.appendChild(opt);
    });
    const current = new Date().getFullYear().toString();
    if (!sel.value) sel.value = current;
}
document.getElementById('year-select').addEventListener('change', () => {
    refreshDeclarationDropdown();
    updateDashboard();
    updateCharts();
});

// -------------------- Invoice numbering per year --------------------
function getLastInvoiceForYear(y) {
    return localStorage.getItem('fg_last_invoice_' + y) || '';
}
function setLastInvoiceForYear(y, val) {
    localStorage.setItem('fg_last_invoice_' + y, val);
}
function generateNextInvoiceNumberForYear(y) {
    const year = y;
    const last = getLastInvoiceForYear(year);
    let newNumber;
    if (last && last.startsWith(year)) {
        const seq = parseInt(last.split('-')[1]) || 0;
        const next = (seq + 1).toString().padStart(5, '0');
        newNumber = `${year}-${next}`;
    } else {
        newNumber = `${year}-00001`;
    }
    setLastInvoiceForYear(year, newNumber);
    document.getElementById('invoice-number').value = newNumber;
    return newNumber;
}

document.getElementById('new-invoice-number').addEventListener('click', () => {
    const y = getSelectedYear();
    const n = generateNextInvoiceNumberForYear(y);
    alert('Nieuw factuurnummer: ' + n);
});

// -------------------- Employee storage --------------------
function loadEmployeeFormFromStorage() {
    const emp = JSON.parse(localStorage.getItem('fg_employee') || 'null');
    if (emp) {
        document.getElementById('employee-name').value = emp.name || '';
        document.getElementById('employee-address').value = emp.address || '';
        document.getElementById('employee-email').value = emp.email || '';
    }
}
function saveEmployeeFormToStorage() {
    const emp = {
        name: document.getElementById('employee-name').value || '',
        address: document.getElementById('employee-address').value || '',
        email: document.getElementById('employee-email').value || ''
    };
    localStorage.setItem('fg_employee', JSON.stringify(emp));
}
['employee-name', 'employee-address', 'employee-email'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', saveEmployeeFormToStorage);
});

// -------------------- My Payment Data (IBAN + TNV) --------------------
function loadMyPaymentData() {
    const data = JSON.parse(localStorage.getItem('fg_my_payment') || '{}');
    document.getElementById('my-iban').value = data.iban || '';
    document.getElementById('my-tnv').value = data.tnv || '';
}

function saveMyPaymentData() {
    const data = {
        iban: document.getElementById('my-iban').value.trim(),
        tnv: document.getElementById('my-tnv').value.trim()
    };
    localStorage.setItem('fg_my_payment', JSON.stringify(data));
    alert("Mijn betaalgegevens opgeslagen.");
}

document.getElementById('save-my-payment').addEventListener('click', saveMyPaymentData);


// -------------------- Rows and calculations --------------------
document.getElementById('add-row').addEventListener('click', () => {
    const tbody = document.getElementById('daily-body');
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td><input type="date" class="day-date"></td>
    <td><input class="day-desc" value="Werkzaamheden"></td>
    <td>Uur</td>
    <td><input type="number" class="day-hours" value="0" min="0" step="0.1"></td>
    <td class="day-rate-hours">€ 0.00</td>
    <td class="day-total">€ 0.00</td>
  `;
    tbody.appendChild(tr);
});
document.getElementById('remove-row').addEventListener('click', () => {
    const tbody = document.getElementById('daily-body');
    if (tbody.children.length > 1) tbody.removeChild(tbody.lastElementChild);
});
function formatNumber(n) { return Number.isInteger(n) ? n : Math.round(n * 100) / 100; }
function updateAllRowTotals() {
    const hourly = Number(document.getElementById('hourly-rate').value || 0);
    const kmRate = Number(document.getElementById('km-rate').value || 0);
    const rows = document.querySelectorAll('#daily-body tr');
    let sumHours = 0, sumHoursAmount = 0, sumKm = 0, sumKmAmount = 0;
    rows.forEach(row => {
        let kmEl = row.querySelector('.day-km');
        if (!kmEl) {
            const tdBefore = row.querySelector('.day-rate-hours');
            const kmCell = document.createElement('td');
            kmCell.innerHTML = `<input type="number" class="day-km" value="0" min="0">`;
            row.insertBefore(kmCell, tdBefore);
            kmEl = row.querySelector('.day-km');
        }
        const hours = Number(row.querySelector('.day-hours').value || 0);
        const km = Number(kmEl.value || 0);
        const hoursAmount = hours * hourly;
        const kmAmount = km * kmRate;
        sumHours += hours; sumHoursAmount += hoursAmount;
        sumKm += km; sumKmAmount += kmAmount;
        const rateCell = row.querySelector('.day-rate-hours');
        rateCell.innerText = '€ ' + hourly.toFixed(2);
        const totalCell = row.querySelector('.day-total');
        totalCell.innerText = '€ ' + (hoursAmount + kmAmount).toFixed(2);
    });
    document.getElementById('sum-hours').innerText = formatNumber(sumHours);
    document.getElementById('sum-hours-amount').innerText = '€ ' + sumHoursAmount.toFixed(2);
    document.getElementById('sum-km').innerText = formatNumber(sumKm);
    document.getElementById('sum-km-amount').innerText = '€ ' + sumKmAmount.toFixed(2);
    document.getElementById('grand-total').innerText = '€ ' + (sumHoursAmount + sumKmAmount).toFixed(2);
}
document.getElementById('daily-body').addEventListener('input', updateAllRowTotals);
document.getElementById('hourly-rate').addEventListener('input', updateAllRowTotals);
document.getElementById('km-rate').addEventListener('input', updateAllRowTotals);

// -------------------- Declarations per year --------------------
function getDeclarationsForYear(year) {
    return JSON.parse(localStorage.getItem('fg_declarations_' + year) || '{}');
}
function saveDeclarationsForYear(year, obj) {
    localStorage.setItem('fg_declarations_' + year, JSON.stringify(obj));
}

function refreshDeclarationDropdown() {
    const sel = document.getElementById('load-declaration');
    sel.innerHTML = `<option value="">-- Open opgeslagen declaratie --</option>`;
    const year = getSelectedYear();
    const all = getDeclarationsForYear(year);
    const ids = Object.keys(all).sort();
    ids.forEach(id => {
        const opt = document.createElement('option');
        opt.value = id; opt.text = id + (all[id].employerID ? ' — ' + all[id].employerID : '');
        sel.appendChild(opt);
    });
}

function saveDeclaration() {
    const year = getSelectedYear();
    let invoiceNumber = document.getElementById('invoice-number').value;
    if (!invoiceNumber) {
        invoiceNumber = generateNextInvoiceNumberForYear(year);
        document.getElementById('invoice-number').value = invoiceNumber;
    } else {
        setLastInvoiceForYear(year, invoiceNumber);
    }

    const rows = [];
    document.querySelectorAll('#daily-body tr').forEach(tr => {
        rows.push({
            date: tr.querySelector('.day-date').value || '',
            desc: tr.querySelector('.day-desc').value || '',
            hours: tr.querySelector('.day-hours').value || 0,
            km: tr.querySelector('.day-km') ? tr.querySelector('.day-km').value || 0 : 0
        });
    });

    const decl = {
        employerID: document.getElementById('employer-id').value || getSelectedEmployer(),
        employee: {
            name: document.getElementById('employee-name').value || '',
            address: document.getElementById('employee-address').value || '',
            email: document.getElementById('employee-email').value || ''
        },
        invoice: {
            number: invoiceNumber,
            date: document.getElementById('invoice-date').value || '',
            dueDate: document.getElementById('invoice-due').value || ''
        },
        rates: {
            hourly: document.getElementById('hourly-rate').value || 0,
            km: document.getElementById('km-rate').value || 0
        },
        rows
    };

    const all = getDeclarationsForYear(year);
    all[invoiceNumber] = decl;
    saveDeclarationsForYear(year, all);
    refreshDeclarationDropdown();
    refreshYearSelect();
    updateDashboard();
    updateCharts();
    alert('Declaratie opgeslagen: ' + invoiceNumber);
}

function loadDeclaration(id) {
    const year = getSelectedYear();
    const all = getDeclarationsForYear(year);
    const d = all[id];
    if (!d) { alert('Declaratie niet gevonden.'); return; }

    // employer
    if (d.employerID) {
        const employers = loadEmployers();
        if (employers[d.employerID]) {
            setSelectedEmployer(d.employerID);
            refreshEmployerSelect();
        } else {
            document.getElementById('employer-id').value = d.employerID;
            document.getElementById('company-name').value = '';
            document.getElementById('company-contact').value = '';
            document.getElementById('company-address').value = '';
            document.getElementById('company-kvk').value = '';
            document.getElementById('company-bank').value = '';
            document.getElementById('company-btw').value = '';
        }
    }

    document.getElementById('employee-name').value = d.employee.name || '';
    document.getElementById('employee-address').value = d.employee.address || '';
    document.getElementById('employee-email').value = d.employee.email || '';

    document.getElementById('invoice-number').value = d.invoice.number || '';
    document.getElementById('invoice-date').value = d.invoice.date || '';
    document.getElementById('invoice-due').value = d.invoice.dueDate || '';

    document.getElementById('hourly-rate').value = d.rates.hourly || '';
    document.getElementById('km-rate').value = d.rates.km || '';

    const tbody = document.getElementById('daily-body');
    tbody.innerHTML = '';
    d.rows.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td><input type="date" class="day-date" value="${r.date}"></td>
      <td><input class="day-desc" value="${escapeHtml(r.desc)}"></td>
      <td>Uur</td>
      <td><input type="number" class="day-hours" value="${r.hours}" step="0.1"></td>
      <td class="day-rate-hours">€ 0.00</td>
      <td class="day-total">€ 0.00</td>
    `;
        // km cell
        const kmCell = document.createElement('td');
        kmCell.innerHTML = `<input type="number" class="day-km" value="${r.km}" min="0">`;
        tr.insertBefore(kmCell, tr.querySelector('.day-rate-hours'));
        tbody.appendChild(tr);
    });
    updateAllRowTotals();
    alert('Declaratie geladen: ' + id);
}

function deleteDeclaration(id) {
    if (!confirm('Verwijder declaratie ' + id + '?')) return;
    const year = getSelectedYear();
    const all = getDeclarationsForYear(year);
    if (all[id]) delete all[id];
    saveDeclarationsForYear(year, all);
    refreshDeclarationDropdown();
    updateDashboard();
    updateCharts();
    alert('Declaratie verwijderd: ' + id);
}

function filterDeclarations() {
    const search = (document.getElementById('declaration-search').value || '').toLowerCase();
    const year = getSelectedYear();
    const all = getDeclarationsForYear(year);
    const sel = document.getElementById('load-declaration');
    sel.innerHTML = `<option value="">-- Open opgeslagen declaratie --</option>`;
    Object.keys(all).forEach(id => {
        const d = all[id];
        const employer = (d.employerID || '').toLowerCase();
        const date = (d.invoice.date || '').toLowerCase();
        if (id.toLowerCase().includes(search) || employer.includes(search) || date.includes(search)) {
            const opt = document.createElement('option');
            opt.value = id; opt.text = id + (d.employerID ? ' — ' + d.employerID : '');
            sel.appendChild(opt);
        }
    });
}

function sortDeclarations() {
    const mode = document.getElementById('declaration-sort').value;
    const sel = document.getElementById('load-declaration');
    const year = getSelectedYear();
    const all = getDeclarationsForYear(year);
    let ids = Object.keys(all);
    if (mode === 'number') {
        ids.sort((a, b) => {
            const aa = parseInt(a.split('-')[1] || '0');
            const bb = parseInt(b.split('-')[1] || '0');
            return aa - bb;
        });
    } else if (mode === 'date') {
        ids.sort((a, b) => {
            const da = new Date(all[a].invoice.date || 0);
            const db = new Date(all[b].invoice.date || 0);
            return da - db;
        });
    }
    sel.innerHTML = `<option value="">-- Open opgeslagen declaratie --</option>`;
    ids.forEach(id => {
        const opt = document.createElement('option');
        opt.value = id; opt.text = id + (all[id].employerID ? ' — ' + all[id].employerID : '');
        sel.appendChild(opt);
    });
}

// -------------------- Dashboard --------------------
function updateDashboard() {
    const year = getSelectedYear();
    const all = getDeclarationsForYear(year);
    let totalDeclarations = 0;
    let totalHours = 0;
    let totalKmAmount = 0;
    let grandTotalAmount = 0;
    Object.values(all).forEach(d => {
        totalDeclarations++;
        const hourly = Number(d.rates.hourly || 0);
        const kmRate = Number(d.rates.km || 0);
        d.rows.forEach(r => {
            const h = Number(r.hours || 0);
            const km = Number(r.km || 0);
            totalHours += h;
            totalKmAmount += km * kmRate;
            grandTotalAmount += (h * hourly) + (km * kmRate);
        });
    });
    document.getElementById('dash-total-declarations').innerText = totalDeclarations;
    document.getElementById('dash-total-hours').innerText = totalHours;
    document.getElementById('dash-total-km-amount').innerText = '€ ' + totalKmAmount.toFixed(2);
    document.getElementById('dash-total-amount').innerText = '€ ' + grandTotalAmount.toFixed(2);
}

// -------------------- Charts (Chart.js) --------------------
let chartOmzet = null;
let chartUren = null;
let chartOpdrachtgevers = null;

// aggregate monthly omzet & uren for selected year
function aggregateMonthlyData() {
    const year = getSelectedYear();
    const all = getDeclarationsForYear(year);
    const omzetPerMaand = Array(12).fill(0);
    const urenPerMaand = Array(12).fill(0);
    Object.values(all).forEach(decl => {
        decl.rows.forEach(row => {
            if (!row.date) return;
            const d = new Date(row.date);
            if (isNaN(d)) return;
            const maand = d.getMonth();
            const hours = Number(row.hours || 0);
            const km = Number(row.km || 0);
            const hourly = Number(decl.rates.hourly || 0);
            const kmRate = Number(decl.rates.km || 0);
            omzetPerMaand[maand] += hours * hourly + km * kmRate;
            urenPerMaand[maand] += hours;
        });
    });
    return { omzetPerMaand, urenPerMaand };
}

// aggregate opdrachtgever (employer) totals for pie chart
function aggregateOpdrachtgevers() {
    const year = getSelectedYear();
    const all = getDeclarationsForYear(year);
    const map = {}; // id -> amount
    Object.values(all).forEach(decl => {
        const id = decl.employerID || 'Onbekend';
        const hourly = Number(decl.rates.hourly || 0);
        const kmRate = Number(decl.rates.km || 0);
        let total = 0;
        decl.rows.forEach(row => {
            const h = Number(row.hours || 0);
            const km = Number(row.km || 0);
            total += (h * hourly) + (km * kmRate);
        });
        if (!map[id]) map[id] = 0;
        map[id] += total;
    });
    return map; // {id: amount}
}

function updateCharts() {
    const { omzetPerMaand, urenPerMaand } = aggregateMonthlyData();
    const opdrachtgeverMap = aggregateOpdrachtgevers();
    const labels = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

    const omzetCtx = document.getElementById('chart-omzet').getContext('2d');
    const urenCtx = document.getElementById('chart-uren').getContext('2d');
    const opdCtx = document.getElementById('chart-opdrachtgevers').getContext('2d');

    if (chartOmzet) chartOmzet.destroy();
    if (chartUren) chartUren.destroy();
    if (chartOpdrachtgevers) chartOpdrachtgevers.destroy();

    chartOmzet = new Chart(omzetCtx, {
        type: 'bar',
        data: { labels, datasets: [{ label: "Omzet (€)", data: omzetPerMaand, borderWidth: 1, backgroundColor: "rgba(0,120,255,0.5)" }] },
        options: { scales: { y: { beginAtZero: true } } }
    });

    chartUren = new Chart(urenCtx, {
        type: 'line',
        data: { labels, datasets: [{ label: "Uren", data: urenPerMaand, borderWidth: 2, backgroundColor: "rgba(255,120,0,0.3)", borderColor: "orange" }] },
        options: { scales: { y: { beginAtZero: true } } }
    });

    // pie chart for opdrachtgevers
    const opdLabels = Object.keys(opdrachtgeverMap);
    const opdData = opdLabels.map(k => opdrachtgeverMap[k]);
    const colors = opdLabels.map((_, i) => {
        // generate simple colors
        const hue = (i * 47) % 360;
        return `hsl(${hue} 70% 50%)`;
    });

    chartOpdrachtgevers = new Chart(opdCtx, {
        type: 'pie',
        data: { labels: opdLabels, datasets: [{ data: opdData, backgroundColor: colors }] },
        options: { responsive: true }
    });
}

// -------------------- New invoice (keep employer) --------------------
function newInvoice() {
    const year = getSelectedYear();
    generateNextInvoiceNumberForYear(year);
    document.getElementById('invoice-date').value = '';
    document.getElementById('invoice-due').value = '';
    document.getElementById('hourly-rate').value = '';
    document.getElementById('km-rate').value = '';
    const tbody = document.getElementById('daily-body');
    tbody.innerHTML = `
    <tr>
      <td><input type="date" class="day-date"></td>
      <td><input class="day-desc" value="Werkzaamheden"></td>
      <td>Uur</td>
      <td><input type="number" class="day-hours" value="0" step="0.1"></td>
      <td class="day-rate-hours">€ 0.00</td>
      <td class="day-total">€ 0.00</td>
    </tr>
  `;
    updateAllRowTotals();
    alert('Nieuwe factuur klaar. Nummer: ' + document.getElementById('invoice-number').value);
}

// -------------------- Generate PDF action --------------------
document.getElementById('generate-pdf').addEventListener('click', async () => {
    saveEmployerFromForm();
    saveEmployeeFormToStorage();

    const year = getSelectedYear();
    let invoiceNumber = document.getElementById('invoice-number').value;
    if (!invoiceNumber) invoiceNumber = generateNextInvoiceNumberForYear(year);
    setLastInvoiceForYear(year, invoiceNumber);

    const employers = loadEmployers();
    const selEmp = (document.getElementById('employer-id').value || getSelectedEmployer());
    const company = employers[selEmp] || {
        name: document.getElementById('company-name').value || '',
        contact: document.getElementById('company-contact').value || '',
        address: document.getElementById('company-address').value || '',
        kvk: document.getElementById('company-kvk').value || '',
        bank: document.getElementById('company-bank').value || '',
        btw: document.getElementById('company-btw').value || ''
    };

    const employee = {
        name: document.getElementById('employee-name').value || '',
        address: document.getElementById('employee-address').value || '',
        email: document.getElementById('employee-email').value || ''
    };

    const invoiceInfo = {
        number: invoiceNumber,
        date: document.getElementById('invoice-date').value || '',
        dueDate: document.getElementById('invoice-due').value || ''
    };

    const hourly = Number(document.getElementById('hourly-rate').value || 0);
    const kmRate = Number(document.getElementById('km-rate').value || 0);

    const rows = [];
    document.querySelectorAll('#daily-body tr').forEach(r => {
        const date = r.querySelector('.day-date').value;
        const desc = r.querySelector('.day-desc').value || 'Werkzaamheden';
        const hours = Number(r.querySelector('.day-hours').value || 0);
        const kmEl = r.querySelector('.day-km');
        const km = kmEl ? Number(kmEl.value || 0) : 0;
        if (date && (hours > 0 || km > 0)) rows.push({ date, desc, hours, km });
    });

    const logo = localStorage.getItem('fg_logo_base64_for_' + selEmp) || document.body.dataset.fgLogo || null;

    const html = generateInvoiceHTML(company, employee, invoiceInfo, rows, hourly, kmRate, logo);
    document.getElementById('invoice-preview').innerHTML = html;
    await generatePDF(document.getElementById('invoice-preview').innerHTML);
    alert('PDF gegenereerd: factuur-' + invoiceNumber + '.pdf');

    // auto-save declaration
    saveDeclaration();
});

// -------------------- Wiring events --------------------
window.addEventListener('load', () => {
    refreshYearSelect();
    refreshEmployerSelect();
    loadEmployeeFormFromStorage();

    loadMyPaymentData();

    refreshDeclarationDropdown();
    updateDashboard();
    updateCharts();
    // set invoice number if exists, else generate
    const y = getSelectedYear();
    const existing = getLastInvoiceForYear(y);
    if (existing) document.getElementById('invoice-number').value = existing;
    else generateNextInvoiceNumberForYear(y);
    updateAllRowTotals();
});

// employer select change
document.getElementById('employer-select').addEventListener('change', (e) => {
    loadSelectedEmployerToForm(e.target.value);
});
document.getElementById('add-employer').addEventListener('click', () => {
    document.getElementById('employer-id').value = '';
    document.getElementById('company-name').value = '';
    document.getElementById('company-contact').value = '';
    document.getElementById('company-address').value = '';
    document.getElementById('company-kvk').value = '';
    document.getElementById('company-bank').value = '';
    document.getElementById('company-btw').value = '';
    delete document.body.dataset.fgLogo;
    document.getElementById('employer-id').focus();
});
document.getElementById('save-employer').addEventListener('click', saveEmployerFromForm);
document.getElementById('delete-employer').addEventListener('click', deleteSelectedEmployer);

// declarations UI
document.getElementById('load-declaration-btn').addEventListener('click', () => {
    const id = document.getElementById('load-declaration').value;
    if (id) loadDeclaration(id);
});
document.getElementById('save-declaration').addEventListener('click', () => {
    saveDeclaration();
    refreshDeclarationDropdown();
    updateDashboard();
    updateCharts();
});
document.getElementById('delete-declaration').addEventListener('click', () => {
    const id = document.getElementById('load-declaration').value;
    if (id) deleteDeclaration(id);
});
document.getElementById('declaration-search').addEventListener('input', () => {
    filterDeclarations();
});
document.getElementById('declaration-sort').addEventListener('change', () => {
    sortDeclarations();
});

// year change handled earlier: refreshDeclarationDropdown & updateDashboard called by listener
document.getElementById('new-invoice').addEventListener('click', newInvoice);
