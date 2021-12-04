// Modules
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './screens/WelcomePage';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <WelcomePage />
      <Footer />
    </Router>
  );
}

export default App;
