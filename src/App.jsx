import { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

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
      },
      {
        id: 2,
        name: "Acquire Bookshelf",
        substages: ["Buy Bookshelf", "Assemble Bookshelf Shell", "Place Shelves"],
        completed: [true, false, false],
        tools: ["Screwdriver", "Screws", "Extreme Patience"],
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

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const updateTools = (projectId, newTools) => {
    setProjects(projects.map(proj => {
      if (proj.id === projectId) {
        return { ...proj, tools: newTools };
      }
      return proj;
    }));
  };

  return (
    <Container fluid className="p-4">
      {/* Top toolbar */}
      <div className="d-flex flex-column align-items-center mb-4">
        <h1>Hobby Goal Tracker</h1>
        <div className="d-flex" style={{ gap: '0.5rem', maxWidth: '500px', width: '100%' }}>
          <Form.Control
            type="text"
            placeholder="New project name"
            value={newProjectName}
            onChange={e => setNewProjectName(e.target.value)}
          />
          <Button onClick={addProject} variant="success">Add</Button>
        </div>
      </div>

      {/* Main content */}
      <Row className="justify-content-center">
        <Col xs={4} md={6} lg={10} xl={12}>
          <ProjectList
            projects={projects}
            onAddSubstage={addSubstage}
            onToggleSubstage={toggleSubstage}
            onRemoveProject={removeProject}
            onSelectProject={handleSelectProject}
            selectedProjectId={selectedProjectId}
            updateTools={updateTools}
          />
        </Col>

        {selectedProject && (
          <Col xs={4} md={8} lg={10} xl={12}>
            <ProjectDetail
              project={selectedProject}
              updateTools={(newTools) => updateTools(selectedProject.id, newTools)}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;
