// Styles
import './styles.scss';

function DoughnutInfo(props) {
  const { data } = props;
  const [paper, plastic, glass, other] = data;

  return (
    <div className="doughnut-labels">
      <div className="paper">
        Paper {paper}%
      </div>
      <div className="plastic">
        Plastic {plastic}%
      </div>
      <div className="glass">
        Glass {glass}%
      </div>
      <div className="other-waste">
        Other waste {other}%
      </div>
    </div>
  );
}

export default DoughnutInfo;
