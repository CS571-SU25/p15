import { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

export default function ToolList({ tools, updateTools, projectId, isFinished }) {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const addTool = () => {
        if (!input.trim()) {
            setError('Please enter a tool or paint name');
            return;
        }

        if (tools.includes(input.trim())) {
            setError('This tool is already in the list');
            return;
        }

        updateTools([...tools, input.trim()]);
        setInput('');
        setError('');
    };

    const removeTool = (index) => {
        updateTools(tools.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTool();
        }
    };

    return (
        <div>
            <h3 className="h5 mb-3">Tools & Paints Needed</h3>

            {tools.length > 0 ? (
                <ListGroup className="mb-3">
                    {tools.map((tool, i) => (
                        <ListGroup.Item
                            key={i}
                            className="d-flex justify-content-between align-items-center"
                        >
                            {tool}
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeTool(i)}
                                aria-label={`Remove tool ${tool}`}
                                disabled={isFinished}
                                className={isFinished ? "opacity-50" : ""}
                            >
                                Remove
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p className="text-muted">No tools or paints added yet</p>
            )}

            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Add a tool or paint"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Add tool or paint"
                    className="mb-2"
                    disabled={isFinished}
                />
                {error && <div className="text-danger small mb-2">{error}</div>}
                <Button 
                    variant="primary" 
                    onClick={addTool}
                    disabled={isFinished}
                    className={isFinished ? "opacity-50" : ""}
                >
                    Add
                </Button>
            </div>
        </div>
    );
}
