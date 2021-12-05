// Components
import Header from './components/Header';
import Footer from './components/Footer';
import RouterWrapper from '../src/routes/RouterWrapper';

// Styles
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
        <RouterWrapper />
      <Footer />
    </div>
  );
}

export default App;
