// Modules
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './screens/WelcomePage';
import ContactUs from './screens/ContactUs';
import Customization from './screens/Customization';
import HowItWorks from './screens/HowItWorks';
import LogIn from './screens/LogIn';
import Mission from './screens/Mission';

// Styles
import './App.css';

const NoMatch = () => {
  return (
    <div>
      <h1>No match</h1>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
