import ToolList from './ToolList';
import { Card } from 'react-bootstrap';

export default function ProjectDetail({ project, updateTools }) {
    return (
        <Card className="mt-3">
            <Card.Header>
                <Card.Title className="mb-0">{project.name} Details</Card.Title>
            </Card.Header>
            <Card.Body>
                <ToolList tools={project.tools || []} updateTools={updateTools} />
            </Card.Body>
        </Card>
    );
}
