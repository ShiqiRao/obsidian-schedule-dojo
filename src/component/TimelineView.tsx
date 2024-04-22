import MatrixBox from "./MatrixBox";

export default function TimelineView() : JSX.Element {
  return (
    <div className="root" data-type="timeline">
      <div className="header">
        <div className="header-today-icon"></div>
        <div className="header-matrix-icon">
          <MatrixBox />
          <MatrixBox />
          <MatrixBox />
          <MatrixBox />
        </div>
        <div className="header-date-container"></div>
      </div>
      <div className="unplan"></div>
      <div className="plan">
        <div className="plan-matrix"></div>
        <div className="plan-timeline">
          <div className="plan-timeline-hand"></div>
        </div>
      </div>
    </div>
  );
};