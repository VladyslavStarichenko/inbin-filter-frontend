// Modules
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './screens/WelcomePage';

// Styles
import './App.css';

const HowItWorks = () => <div><h1>How it works</h1></div>;
const Customization = () => <div><h1>Customization</h1></div>;
const Mission = () => <div><h1>Our Mission</h1></div>;
const ContactUs = () => <div><h1>Contact Us</h1></div>;
const LogIn = () => <div><h1>Log in</h1></div>;
const NoMatch = () => <div><h1>No match</h1></div>;

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
