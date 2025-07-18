import { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

export default function ToolList({ tools, updateTools }) {
    const [input, setInput] = useState('');

    const addTool = () => {
        if (input.trim()) {
            updateTools([...tools, input.trim()]);
            setInput('');
        }
    };

    const removeTool = (index) => {
        updateTools(tools.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h3>Tools & Paints Needed</h3>
            <ListGroup className="mb-3">
                {tools.map((tool, i) => (
                    <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                        {tool}
                        <Button variant="outline-danger" size="sm" onClick={() => removeTool(i)}>
                            Remove
                        </Button>
                    </ListGroup.Item>
                 ))}
            </ListGroup>
            <Form.Control
                type="text"
                placeholder="Add a tool or paint"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="mb-2"
            />
            <Button variant="primary" onClick={addTool}>Add</Button>
        </div>
    );
}
