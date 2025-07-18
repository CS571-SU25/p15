export default function SubstageList({ substages, completed, onToggle }) {
    return (
        <ul>
            {substages.map((step, i) => (
                <li key={i}>
                    <label>
                        <input
                            type="checkbox"
                            checked={completed[i]}
                            onChange={() => onToggle(i)}
                        />
                        {step}
                    </label>
                </li>
            ))}
        </ul>
  );
}
