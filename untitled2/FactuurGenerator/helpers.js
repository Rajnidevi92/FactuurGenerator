// helpers.js – genereren van factuur-HTML + PDF

function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
}

/**
 * Genereer HTML van de factuur voor preview én PDF creation
 */
function generateInvoiceHTML(company, employee, invoiceInfo, rows, hourly, kmRate, logoBase64) {


    const myPayment = JSON.parse(localStorage.getItem('fg_my_payment') || '{}');

    let totalHours = 0;
    let totalKm = 0;
    let totalHoursAmount = 0;
    let totalKmAmount = 0;

    rows.forEach(r => {
        const hours = Number(r.hours || 0);
        const km = Number(r.km || 0);
        totalHours += hours;
        totalKm += km;
        totalHoursAmount += hours * hourly;
        totalKmAmount += km * kmRate;
    });

    const grandTotal = totalHoursAmount + totalKmAmount;

    const rowsHtml = rows.map(r => `
    <tr>
      <td>${escapeHtml(r.date)}</td>
      <td>${escapeHtml(r.desc)}</td>
      <td>Uur</td>
      <td>${r.hours}</td>
      <td>€ ${Number(hourly).toFixed(2)}</td>
      <td>€ ${(r.hours * hourly).toFixed(2)}</td>
    </tr>
    <tr>
      <td>${escapeHtml(r.date)}</td>
      <td>Kilometervergoeding</td>
      <td>KM</td>
      <td>${r.km}</td>
      <td>€ ${Number(kmRate).toFixed(2)}</td>
      <td>€ ${(r.km * kmRate).toFixed(2)}</td>
    </tr>
  `).join('');

    return `
  <div style="font-family: Arial; padding: 20px; width: 800px;">

    <div style="display:flex; justify-content:space-between;">
      <div>
        <h2>${escapeHtml(company.name)}</h2>
        <div>${escapeHtml(company.contact)}</div>
        <div>${escapeHtml(company.address)}</div>
        <br>
        <div>KvK: ${escapeHtml(company.kvk)}</div>
        <div>Bank: ${escapeHtml(company.bank)}</div>
        <div>BTW: ${escapeHtml(company.btw)}</div>
      </div>
      <div>
        ${logoBase64 ? `<img src="${logoBase64}" style="height:120px;">` : ''}
      </div>
    </div>

    <hr style="margin:20px 0;">

    <h1 style="text-align:center;">FACTUUR</h1>

    <table style="width:100%; margin-bottom:25px; font-size:14px;">
      <tr>
        <td><strong>Factuurnummer:</strong> ${escapeHtml(invoiceInfo.number)}</td>
        <td><strong>Factuurdatum:</strong> ${escapeHtml(invoiceInfo.date)}</td>
      </tr>
      <tr>
        <td><strong>Vervaldatum:</strong> ${escapeHtml(invoiceInfo.dueDate)}</td>
        <td><strong>Werknemer:</strong> ${escapeHtml(employee.name)}</td>
      </tr>
      <tr>
        <td></td>
        <td>${escapeHtml(employee.address)}</td>
      </tr>
      <tr>
        <td></td>
        <td>${escapeHtml(employee.email)}</td>
      </tr>
    </table>

    <table style="width:100%; border-collapse:collapse; font-size:14px;">
      <thead>
        <tr style="background:#f0f0f0;">
          <th style="border:1px solid #ccc; padding:6px;">Datum</th>
          <th style="border:1px solid #ccc; padding:6px;">Omschrijving</th>
          <th style="border:1px solid #ccc; padding:6px;">Eenheid</th>
          <th style="border:1px solid #ccc; padding:6px;">Aantal</th>
          <th style="border:1px solid #ccc; padding:6px;">Tarief</th>
          <th style="border:1px solid #ccc; padding:6px;">Totaal</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" style="text-align:right; border:1px solid #ccc; padding:6px;"><strong>Totaal uren</strong></td>
          <td style="border:1px solid #ccc; padding:6px;">€ ${totalHoursAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="5" style="text-align:right; border:1px solid #ccc; padding:6px;"><strong>Totaal kilometerkosten</strong></td>
          <td style="border:1px solid #ccc; padding:6px;">€ ${totalKmAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="5" style="text-align:right; border:1px solid #ccc; padding:6px; font-size:16px;"><strong>TOTAAL</strong></td>
          <td style="border:1px solid #ccc; padding:6px; font-size:16px;"><strong>€ ${grandTotal.toFixed(2)}</strong></td>
        </tr>
      </tfoot>
    </table>

    <p style="margin-top:25px; font-size:14px;">
      <!-- Mijn eigen betaalgegevens -->
<p style="margin-top:25px; font-size:14px;">
  Gelieve het totaalbedrag binnen 30 dagen over te maken naar rekening
  <strong>${escapeHtml(myPayment.iban)}</strong>,
  t.n.v. <strong>${escapeHtml(myPayment.tnv)}</strong>,
  onder vermelding van factuurnummer
  <strong>${escapeHtml(invoiceInfo.number)}</strong>.
</p>

    </p>

  </div>
  `;
}

/**
 * PDF genereren vanuit HTML
 *  - ondersteunt meerdere pagina’s
 *  - goede marges
 */
async function generatePDF(htmlString) {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 25;
    const maxWidth = pageWidth - margin * 2;

    const temp = document.createElement('div');
    temp.innerHTML = htmlString;
    temp.style.width = maxWidth + 'px';
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    document.body.appendChild(temp);

    const canvas = await html2canvas(temp, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    let imgHeight = (canvas.height * (maxWidth / canvas.width));
    let pageHeight = pdf.internal.pageSize.getHeight();
    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, margin, maxWidth, imgHeight);
    heightLeft -= (pageHeight - margin * 2);

    while (heightLeft > 0) {
        pdf.addPage();
        position = margin - (imgHeight - heightLeft);
        pdf.addImage(imgData, 'PNG', margin, position, maxWidth, imgHeight);
        heightLeft -= (pageHeight - margin * 2);
    }

    document.body.removeChild(temp);

    const name = 'factuur-' + Date.now() + '.pdf';
    pdf.save(name);
}
