import { Form, Button } from 'react-bootstrap';

export default function AddProjectForm({ value, onChange, onSubmit }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="d-flex mb-4" style={{ gap: '0.5rem', maxWidth: '500px' }}>
            <Form.Control
                type="text"
                placeholder="New project name"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                aria-label="New project name"
            />
            <Button onClick={onSubmit} variant="success">Add</Button>
        </div>
    );
}
