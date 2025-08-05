import { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import SubstageList from './SubstageList';
import ProgressBar from './ProgressBar';
import CompletionBadge from './CompletionBadge';
import ToolList from './ToolList';

export default function ProjectCard({ 
    project, 
    onAddSubstage, 
    onToggleSubstage, 
    onRemoveProject, 
    onSelectProject, 
    selectedProjectId,
    onReorderSubstage,
    onToggleStatus,
    isFinished,
    updateTools,
    onDeleteSubstage
}) {
    const completedCount = project.completed.filter(Boolean).length;
    const totalSteps = project.substages.length;
    const allStepsCompleted = completedCount === totalSteps && totalSteps > 0;
    const [newStep, setNewStep] = useState('');
    const isSelected = selectedProjectId === project.id;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (isFinished && isSelected) {
            onSelectProject(null);
        }
    }, [isFinished, isSelected, onSelectProject]);

    const handleAddStep = () => {
        if (!newStep.trim()) return;
        onAddSubstage(project.id, newStep.trim());
        setNewStep('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && newStep.trim()) {
            e.preventDefault();
            handleAddStep();
        }
    };

    const handleDeleteStep = (index) => {
        if (onDeleteSubstage) {
            onDeleteSubstage(project.id, index);
        }
    };

    const confirmDelete = () => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirmed = () => {
        onRemoveProject(project.id);
        setShowDeleteConfirm(false);
    };

    const handleToggleStatus = () => {
        onToggleStatus(project.id);
    };

    return (
        <div 
            className={`card mb-4 ${isSelected ? 'border-primary' : ''}`}
            aria-expanded={isSelected}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="h5 mb-0" id={`project-title-${project.id}`}>
                        {project.name}
                    </h2>
                    <CompletionBadge 
                        completed={completedCount} 
                        total={totalSteps} 
                    />
                </div>
                
                {!isFinished && (
                    <ProgressBar 
                        completed={completedCount} 
                        total={totalSteps} 
                        aria-labelledby={`project-title-${project.id}`}
                    />
                )}
                
                {!isFinished ? (
                    <>
                        <SubstageList
                            substages={project.substages}
                            completed={project.completed}
                            onToggle={index => onToggleSubstage(project.id, index)}
                            onReorder={(fromIndex, toIndex) => onReorderSubstage(project.id, fromIndex, toIndex)}
                            onDeleteStep={handleDeleteStep}
                        />
                        
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (newStep.trim()) handleAddStep();
                            }}
                            className="d-flex mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Add new step"
                                value={newStep}
                                onChange={e => setNewStep(e.target.value)}
                                onKeyDown={handleKeyDown}
                                aria-label="Add new step"
                                aria-required="true"
                                disabled={isFinished}
                            />
                            <Button 
                                type="submit"
                                variant="primary" 
                                disabled={!newStep.trim() || isFinished}
                                className="ms-2"
                            >
                                Add Step
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="mt-3">
                        <h3 className="h6">Completed Steps</h3>
                        <ul aria-label={`Completed steps for ${project.name}`}>
                            {project.substages.map((step, i) => (
                                <li 
                                    key={i} 
                                    style={{ 
                                        textDecoration: project.completed[i] ? 'line-through' : 'none',
                                        color: project.completed[i] ? 'var(--bs-success)' : 'inherit'
                                    }}
                                >
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                <div className="d-flex flex-wrap gap-2 mt-3">
                    <Button 
                        variant="danger" 
                        onClick={confirmDelete}
                        aria-label={`Delete project ${project.name}`}
                        disabled={isFinished}
                        className={isFinished ? "opacity-50" : ""}
                    >
                        Delete Project
                    </Button>
                    
                    <Button
                        variant={isFinished ? "primary" : "success"}
                        onClick={handleToggleStatus}
                        disabled={(!isFinished && !allStepsCompleted) || totalSteps === 0}
                        aria-label={isFinished ? 
                            `Mark project ${project.name} as active` : 
                            `Mark project ${project.name} as finished`}
                    >
                        {isFinished ? "Mark as Active" : "Mark as Finished"}
                    </Button>
                    
                    <Button
                        variant={isSelected ? "secondary" : "info"}
                        onClick={() => onSelectProject(isSelected ? null : project.id)}
                        aria-pressed={isSelected}
                        aria-label={isSelected ? 
                            `Hide details for ${project.name}` : 
                            `Show details for ${project.name}`}
                        disabled={isFinished}
                        className={isFinished ? "opacity-50" : ""}
                    >
                        {isSelected ? 'Hide Details' : 'Show Details'}
                    </Button>
                </div>
                
                {!isFinished && !allStepsCompleted && totalSteps > 0 && (
                    <p className="mt-2 text-warning mb-0">
                        <small>Complete all steps to mark as finished</small>
                    </p>
                )}
                
                {!isFinished && totalSteps === 0 && (
                    <p className="mt-2 text-warning mb-0">
                        <small>Add steps to your project first</small>
                    </p>
                )}
                
                {isSelected && !isFinished && (
                    <div className="mt-4" aria-live="polite">
                        <ToolList 
                            tools={project.tools || []} 
                            updateTools={(newTools) => updateTools(project.id, newTools)}
                            projectId={project.id}
                            isFinished={isFinished}
                        />
                    </div>
                )}
            </div>

            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the project "{project.name}"? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirmed}>
                        Delete Project
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
