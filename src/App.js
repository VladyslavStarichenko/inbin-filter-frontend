// Modules
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './screens/WelcomePage';
import HowItWorks from './screens/HowItWorks';
import LogIn from './screens/LogIn';
import Mission from './screens/Mission';

// Styles
import './App.css';
import SignUp from './screens/SignUp';


import useAuth from './hooks/useAuth/index';
import { useCallback } from 'react';


const NoMatch = () => {
  return (
    <div>
      <h1>No match</h1>
    </div>
  );
};

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
