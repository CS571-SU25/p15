export default function CompletionBadge({ completed, total }) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    let variant = "secondary";
    if (percentage === 100) variant = "success";
    else if (percentage >= 75) variant = "primary";
    else if (percentage >= 50) variant = "info";
    else if (percentage >= 25) variant = "warning";
    
    return (
        <span className={`badge bg-${variant}`}>
            {completed}/{total} ({percentage}%)
        </span>
    );
}