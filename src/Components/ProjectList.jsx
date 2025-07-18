import ProjectCard from './ProjectCard';

export default function ProjectList({ projects, onAddSubstage, onToggleSubstage, onRemoveProject, onSelectProject, selectedProjectId }) {
    return (
        <div>
            {projects.map(project => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onAddSubstage={onAddSubstage}
                    onToggleSubstage={onToggleSubstage}
                    onRemoveProject={onRemoveProject}
                    onSelectProject={onSelectProject}
                    selectedProjectId={selectedProjectId}
                />
            ))}
           
        </div>
    );
}
