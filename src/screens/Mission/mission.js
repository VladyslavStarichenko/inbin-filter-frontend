// Assets
import forestPicture from '../../assets/image/forestPicture.jpeg';

// Styles
import './styles.scss';

function Mission() {
  return (
    <div className="mission-outer-container">
      <div className="mission-description">
        <h1 className="mission-header">OUR MISSION</h1>
        <p className="mission-text">
          ...is to revolutionize recycling chain
          by creating a systematic solution that
          fully automizes waste management, which
          will lead to sustainable, clean World
          and better future for generations.
        </p>
      </div>
      <img src={forestPicture} alt="Forest" className="forest-background-image" />
    </div>
  );
}

export default Mission;
