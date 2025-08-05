export default function ProgressBar({ completed, total }) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
    return (
        <div className="mb-2">
            <div className="d-flex justify-content-between mb-1">
                <span>Progress: {completed}/{total} steps</span>
                <span>{percentage}%</span>
            </div>
            <div className="progress" style={{ height: '20px' }}>
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    aria-valuenow={percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${percentage}%` }}
                >
                </div>
            </div>
        </div>
    );
}