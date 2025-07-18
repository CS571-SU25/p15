import { useState } from 'react';
import { Button } from 'react-bootstrap';
import SubstageList from './SubstageList';

export default function ProjectCard({ project, onAddSubstage, onToggleSubstage, onRemoveProject, onSelectProject, selectedProjectId }) {
    const completedCount = project.completed.filter(Boolean).length;
    const [newStep, setNewStep] = useState('');

    const handleAddStep = () => {
        if (!newStep.trim()) return;
        onAddSubstage(project.id, newStep.trim());
        setNewStep('');
    };

  return (
        <div style={{ border: '1px solid gray', marginBottom: '1rem', padding: '1rem' }}>
           <h2
                style={{ color: 'black', textDecoration: 'bold' }}
            >
                {project.name}
            </h2>
            <p>{completedCount} of {project.substages.length} steps completed</p>

            <SubstageList
                substages={project.substages}
                completed={project.completed}
                onToggle={index => onToggleSubstage(project.id, index)}
            />
            <input
                type="text"
                placeholder="Add new step"
                value={newStep}
                onChange={e => setNewStep(e.target.value)}
            />
            <Button variant="danger" className="me-2" onClick={() => onRemoveProject(project.id)}>
                Delete Project
            </Button>

            <Button
                variant="info"
                onClick={() => onSelectProject(project.id)}
                className="mb-2"
            >
                {selectedProjectId === project.id ? 'Close Details' : 'View Details'}
            </Button>

            <Button variant="primary" onClick={handleAddStep}>Add Step</Button>
        </div>
  );
}
