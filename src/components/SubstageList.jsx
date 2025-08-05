export default function SubstageList({ substages, completed, onToggle, onReorder, onDeleteStep }) {
    if (substages.length === 0) {
        return <p className="text-muted">No steps added yet</p>;
    }

    return (
        <ul className="list-group mb-3">
            {substages.map((step, i) => (
                <li 
                    key={i} 
                    className="list-group-item d-flex align-items-center"
                >
                    <div className="form-check flex-grow-1">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            id={`step-${i}`}
                            checked={completed[i]}
                            onChange={() => onToggle(i)}
                            aria-label={`Mark step "${step}" as ${completed[i] ? 'incomplete' : 'complete'}`}
                        />
                        <label 
                            className="form-check-label" 
                            htmlFor={`step-${i}`}
                            style={{ textDecoration: completed[i] ? 'line-through' : 'none' }}
                        >
                            {step}
                        </label>
                    </div>
                    
                    <div className="btn-group ms-2">
                        <button 
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onReorder(i, i - 1)}
                            disabled={i === 0}
                            aria-label="Move step up"
                            title="Move step up"
                        >
                            <i className="bi bi-arrow-up"></i> Up
                        </button>
                        <button 
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onReorder(i, i + 1)}
                            disabled={i === substages.length - 1}
                            aria-label="Move step down"
                            title="Move step down"
                        >
                            <i className="bi bi-arrow-down"></i> Down
                        </button>
                        <button 
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDeleteStep(i)}
                            aria-label={`Delete step "${step}"`}
                            title="Delete step"
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
