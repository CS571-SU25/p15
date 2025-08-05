import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import ProjectList from './components/ProjectList';
import FinishedProjectsPage from './components/FinishedProjectsPage';
import StatisticsPage from './components/StatisticsPage';
import AddProjectForm from './components/AddProjectForm';
import ProjectHeader from './components/ProjectHeader';
import EmptyState from './components/EmptyState';
import './App.css';

function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Skeletons",
        substages: ["Assemble", "Prime", "Basecoat", "Detail"],
        completed: [false, false, false, false],
        tools: ["Glue", "Paintbrush", "Bone Paint", "Ink"],
        isFinished: false,
      },
      {
        id: 2,
        name: "Acquire Bookshelf",
        substages: ["Buy Bookshelf", "Assemble Bookshelf Shell", "Place Shelves"],
        completed: [true, true, true],
        tools: ["Screwdriver", "Screws", "Extreme Patience"],
        isFinished: true,
      },
    ];
  });

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (!newProjectName.trim()) return;
    const newProj = {
      id: Date.now(),
      name: newProjectName.trim(),
      substages: [],
      completed: [],
      tools: [],
      isFinished: false,
    };
    setProjects([...projects, newProj]);
    setNewProjectName('');
  };

  const addSubstage = (projectId, stepName) => {
    setProjects(projects.map(proj => {
      if (proj.id === projectId) {
        return {
          ...proj,
          substages: [...proj.substages, stepName],
          completed: [...proj.completed, false],
        };
      }
      return proj;
    }));
  };

  const toggleSubstage = (projectId, index) => {
    setProjects(projects.map(proj => {
      if (proj.id === projectId) {
        const newCompleted = [...proj.completed];
        newCompleted[index] = !newCompleted[index];
        return { ...proj, completed: newCompleted };
      }
      return proj;
    }));
  };

  const removeProject = (projectId) => {
    setProjects(projects.filter(proj => proj.id !== projectId));
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    }
  };

  const handleSelectProject = (id) => {
    setSelectedProjectId(prev => prev === id ? null : id);
  };

  const updateTools = (projectId, newTools) => {
    setProjects(projects.map(proj => {
      if (proj.id === projectId) {
        return { ...proj, tools: newTools };
      }
      return proj;
    }));
  };

  const reorderSubstage = (projectId, fromIndex, toIndex) => {
    setProjects(projects.map(proj => {
      if (proj.id === projectId) {
        if (toIndex < 0 || toIndex >= proj.substages.length) return proj;
        
        const newSubstages = [...proj.substages];
        const newCompleted = [...proj.completed];
        
        const [movedStage] = newSubstages.splice(fromIndex, 1);
        const [movedCompleted] = newCompleted.splice(fromIndex, 1);
        
        newSubstages.splice(toIndex, 0, movedStage);
        newCompleted.splice(toIndex, 0, movedCompleted);
        
        return { ...proj, substages: newSubstages, completed: newCompleted };
      }
      return proj;
    }));
  };

  const toggleProjectStatus = (projectId) => {
    setProjects(projects.map(proj => {
      if (proj.id === projectId) {
        const allCompleted = proj.completed.every(c => c);
        return { 
          ...proj, 
          isFinished: allCompleted ? !proj.isFinished : proj.isFinished
        };
      }
      return proj;
    }));
  };

  const deleteSubstage = (projectId, index) => {
    setProjects(projects.map(proj => {
      if (proj.id === projectId) {
        const newSubstages = [...proj.substages];
        const newCompleted = [...proj.completed];
        newSubstages.splice(index, 1);
        newCompleted.splice(index, 1);
        return { ...proj, substages: newSubstages, completed: newCompleted };
      }
      return proj;
    }));
  };

  const activeProjects = projects.filter(project => !project.isFinished);
  const finishedProjects = projects.filter(project => project.isFinished);

  return (
    <BrowserRouter>
      <NavBar />
      <Container fluid className="p-4">
        <Routes>
          <Route path="/" element={
            <>
              <ProjectHeader />
              <AddProjectForm
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
                onSubmit={addProject}
              />
              
              {activeProjects.length > 0 ? (
                <ProjectList
                  projects={activeProjects}
                  onAddSubstage={addSubstage}
                  onToggleSubstage={toggleSubstage}
                  onRemoveProject={removeProject}
                  onSelectProject={handleSelectProject}
                  selectedProjectId={selectedProjectId}
                  updateTools={updateTools}
                  onReorderSubstage={reorderSubstage}
                  onToggleStatus={toggleProjectStatus}
                  isFinished={false}
                  onDeleteSubstage={deleteSubstage}
                />
              ) : (
                <EmptyState />
              )}
            </>
          } />
          <Route path="/finished" element={
            <FinishedProjectsPage 
              projects={finishedProjects}
              onToggleStatus={toggleProjectStatus}
              onSelectProject={handleSelectProject}
              selectedProjectId={selectedProjectId}
              updateTools={updateTools}
            />
          } />
          <Route path="/statistics" element={<StatisticsPage projects={projects} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;