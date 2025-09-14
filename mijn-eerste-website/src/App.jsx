import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Login from './pages/inlog/Inlog.jsx';
import Registration from './pages/registration/Registration.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import AllComplaints from './pages/allcomplaints/Allcomplaints.jsx';
import Privacy from './pages/privacy/Privacy.jsx';
import Disclaimer from './pages/disclaimer/Disclaimer.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/allcomplaints" element={<AllComplaints />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
            </Routes>
        </Router>
    );
}

export default App;
