import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ProjectCard from './ProjectCard';

export default function FinishedProjectsPage({ 
    projects, 
    onToggleStatus,
    onSelectProject,
    selectedProjectId
}) {
    return (
        <div className="mt-4">
            <Card className="mb-4">
                <Card.Header>
                    <Card.Title as="h1">Finished Projects</Card.Title>
                </Card.Header>
                <Card.Body>
                    {projects.length === 0 ? (
                        <div className="text-center p-5 border rounded">
                            <h2>No Finished Projects Yet</h2>
                            <p className="mb-4">
                                Projects you mark as finished will appear here. 
                                Complete all steps in a project to mark it as finished.
                            </p>
                            <Button as={Link} to="/" variant="success">
                                View Active Projects
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2>Your Completed Projects</h2>
                                <span className="badge bg-success">
                                    {projects.length} project{projects.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            
                            <div className="project-list" role="list">
                                {projects.map(project => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onToggleStatus={onToggleStatus}
                                        onSelectProject={onSelectProject}
                                        selectedProjectId={selectedProjectId}
                                        isFinished={true}
                                        onAddSubstage={null}
                                        onReorderSubstage={null}
                                        onDeleteSubstage={null}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
