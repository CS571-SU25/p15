import ProjectCard from './ProjectCard';

export default function ProjectList({ 
    projects, 
    onAddSubstage, 
    onToggleSubstage, 
    onRemoveProject, 
    onSelectProject, 
    selectedProjectId,
    updateTools,
    onReorderSubstage,
    onToggleStatus,
    isFinished,
    onDeleteSubstage
}) {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>{isFinished ? "Finished Projects" : "Active Projects"}</h2>
                <span className="badge bg-info">{projects.length} projects</span>
            </div>
            {projects.map(project => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onAddSubstage={onAddSubstage}
                    onToggleSubstage={onToggleSubstage}
                    onRemoveProject={onRemoveProject}
                    onSelectProject={onSelectProject}
                    selectedProjectId={selectedProjectId}
                    updateTools={updateTools}
                    onReorderSubstage={onReorderSubstage}
                    onToggleStatus={onToggleStatus}
                    isFinished={isFinished}
                    onDeleteSubstage={onDeleteSubstage}
                />
            ))}
        </div>
    );
}
