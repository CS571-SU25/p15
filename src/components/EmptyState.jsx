import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default function EmptyState() {
    return (
        <div className="text-center p-5 border rounded">
            <h2>No Projects Yet</h2>
            <p className="mb-4">Get started by creating your first project!</p>
            <Button as={Link} to="/" variant="primary">Create Project</Button>
        </div>
    );
}