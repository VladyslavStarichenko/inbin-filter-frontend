// Assets
import automaticSorting from '../../assets/image/automatic-sorting.png';
import aiBasedWaste from '../../assets/image/ai-based-waste.png';
import binEContainers from '../../assets/image/binecontainers.jpeg';
import dataProcessing from '../../assets/image/data-processing.png';
import fillLevel from '../../assets/image/fill-level.png';
import smartContainer from '../../assets/image/Bin-e_custo_new.webp';
import plasticAndPaperImage from '../../assets/image/plastic.png';
import phoneBine from '../../assets/image/phonebine.webp';
import throwingImage from '../../assets/image/throwing.png';
import skyScapers from '../../assets/image/skyscapers.webp';

// Styles
import './styles.scss';

function WelcomePage() {
  return (
    <div className="welcome-page-wrapper">
      <div className="welcome-picture-container">
        <img
          alt="Bin-E containers"
          src={binEContainers}
          className="welcome-picture__image"
          width="98%"
        />
      </div>
      <div className="find-out-more-container">
        <h2 className="new-bine">THE NEW BIN-E</h2>
        <p className="description-bine">THE BRAND NEW VERSION OF THE WORLDWIDE SMARTEST WASTE BIN</p>
        <button className="description-btn">Find out more</button>
      </div>
      <div className="description-image-block">
        <div className="description-block">
          <h2 className="smart-title">SMART <span className="important">WASTE</span> BIN</h2>
          <p className="smart-description">
            BIN-E IS AN IOT DEVICE WHICH SORTS AND COMPRESSES
            THE RECYCLABLES AUTOMATICALLY. IT COMBINES UNIQUE AI-BASED
            OBJECT RECOGNITION, FILL LEVEL CONTROL AND DATA PROCESSING
            TO MAKE WASTE MANAGEMENT CONVENIENT AND EFFICIENT.
          </p>
        </div>
        <div className="description-image">
          <img src={smartContainer} alt="Smart bine" />
        </div>
      </div>
      <div className="icon-wrapper">
        <div className="left-section">
          <div className="image-span-container take-up">
            <img src={throwingImage} alt="Throwing" />
            <div className="icon-text">THROWING</div>
          </div>
          <div className="image-span-container">
            <img src={aiBasedWaste} alt="Ai-based" />
            <div className="icon-text">
              AI-BASED WASTE<br /> RECOGNITION
            </div>
          </div>
          <div className="image-span-container">
            <img src={automaticSorting} alt="Automatic-sorting" />
            <div className="icon-text">AUTOMATIC SORTING</div>
          </div>
        </div>
        <div className="right-section">
          <div className="image-span-container">
            <img src={plasticAndPaperImage} alt="Plastic and Paper" />
            <div className="icon-text">PLASTIC AND PAPER COMPRESSION</div>
          </div>
          <div className="image-span-container">
            <img src={fillLevel} alt="Fill levele control" />
            <div className="icon-text">FILL LEVEL CONTROL</div>
          </div>
          <div className="image-span-container">
            <img src={dataProcessing} alt="Data processing" />
            <div className="icon-text">DATA PROCESSING IN THE CLOUD</div>
          </div>
        </div>
      </div>
      <div className="first-innovation-plus">
        <div className="first-plus-image">
          <img src={skyScapers} alt="Skyscapers" />
        </div>
        <div className="first-plus-description">
          <div>
            <h2 className="first-plus-text">EFFICIENT WASTE MANAGEMENT IN YOUR BUILDING</h2>
            <p className="first-plus-paragraph">
              Bin-e optimizes waste management in your facility,
              allowing you to save costs, time and labour. It ensures
              precisely sorted raw material through automatic recognition
              and segregation. Thanks to the compression of plastic and
              paper the frequency of emptying the bins is reduced by half.
            </p>
          </div>
        </div>
      </div>
      <div className="second-innovation-plus">
        <div className="second-plus-description">
          <div>
            <h2 className="second-plus-text">EASY MANAGEMENT WITH THE APP</h2>
            <p className="second-plus-paragraph">
              Automatic notifications when one of the containers
              is full allow for more effective time management of
              employees. The app shows the fill level of each
              fraction and the status of the device in real-time.
            </p>
          </div>
        </div>
        <div className="second-plus-image">
          <img src={phoneBine} alt="Phone bine application" />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
