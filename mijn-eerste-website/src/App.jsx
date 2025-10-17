import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Login from './pages/inlogPage/Inlog.jsx';
import Registration from './pages/registrationPage/Registration.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import AllComplaints from './pages/allComplaints/AllComplaints.jsx';
import Privacy from './pages/privacyPage/Privacy.jsx';
import Disclaimer from './pages/disclaimerPage/Disclaimer.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <Header />

                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/allcomplaints" element={<AllComplaints />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
