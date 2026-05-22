function ProgressPanel({ progressPercentage, categoryProgress }) {
  return (
    <div className="progressSection">
      <div className="progressInfo">
        <span>Overall progress</span>
        <span>{progressPercentage}%</span>
      </div>
      <div className="progressBar">
        <div className="progressFill" style={{ width: `${progressPercentage}%` }} />
      </div>
      {categoryProgress.length > 0 && (
        <div className="categoryProgressSection">
          {categoryProgress.map((item) => (
            <div key={item.category} className="categoryProgressItem">
              <div className="progressInfo">
                <span>{item.category}</span>
                <span>{item.percentage}%</span>
              </div>
              <div className="progressBar">
                <div className="progressFill" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressPanel;
