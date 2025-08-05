import { Card, ProgressBar } from 'react-bootstrap';

export default function StatisticsPage({ projects }) {
    const activeProjects = projects.filter(p => !p.isFinished);
    const finishedProjects = projects.filter(p => p.isFinished);
    
    const totalProjects = projects.length;
    const completedProjects = finishedProjects.length;
    
    const totalSteps = projects.reduce((sum, project) => sum + project.substages.length, 0);
    const completedSteps = projects.reduce((sum, project) => 
        sum + project.completed.filter(c => c).length, 0);
    
    const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    
    return (
        <div className="mt-4">
            <Card className="mb-4">
                <Card.Header>
                    <Card.Title>Overall Progress</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between mb-3">
                        <h3 className="h5">Total Progress</h3>
                        <span>{progressPercentage}%</span>
                    </div>
                    <ProgressBar 
                        now={progressPercentage} 
                        label={`${progressPercentage}%`} 
                        style={{ height: '30px' }}
                        variant="success"
                    />
                    
                    <div className="row mt-4">
                        <div className="col-md-4 mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title className="h5">Projects</Card.Title>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Total:</span>
                                        <span className="h4">{totalProjects}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Active:</span>
                                        <span className="h4">{activeProjects.length}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Finished:</span>
                                        <span className="h4 text-success">{completedProjects}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        
                        <div className="col-md-4 mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title className="h5">Steps</Card.Title>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Total:</span>
                                        <span className="h4">{totalSteps}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Completed:</span>
                                        <span className="h4 text-success">{completedSteps}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Remaining:</span>
                                        <span className="h4">{totalSteps - completedSteps}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        
                        <div className="col-md-4 mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title className="h5">Completion</Card.Title>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Projects:</span>
                                        <span className="h4">{totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0}%</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Steps:</span>
                                        <span className="h4">{progressPercentage}%</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            
            <Card>
                <Card.Header>
                    <Card.Title>Project Details</Card.Title>
                </Card.Header>
                <Card.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Status</th>
                                <th>Progress</th>
                                <th>Completed Steps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => {
                                const completed = project.completed.filter(c => c).length;
                                const total = project.substages.length;
                                const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
                                
                                return (
                                    <tr key={project.id}>
                                        <td>{project.name}</td>
                                        <td>
                                            {project.isFinished ? (
                                                <span className="badge bg-success">Finished</span>
                                            ) : (
                                                <span className="badge bg-info">Active</span>
                                            )}
                                        </td>
                                        <td>
                                            <ProgressBar 
                                                now={percentage} 
                                                label={`${percentage}%`} 
                                                variant={project.isFinished ? "success" : "info"}
                                            />
                                        </td>
                                        <td>{completed}/{total}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </div>
    );
}
