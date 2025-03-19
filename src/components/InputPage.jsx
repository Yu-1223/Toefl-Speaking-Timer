import React, { useState } from 'react';
import './InputPage.css'; // Add CSS file here

const InputPage = ({ readingMaterials, setReadingMaterials, isMobile }) => {
  const [selectedTask, setSelectedTask] = useState(1);
  const [title, setTitle] = useState(readingMaterials[selectedTask].title);
  const [passage, setPassage] = useState(readingMaterials[selectedTask].passage);

  const handleTaskChange = (e) => {
    const taskNumber = parseInt(e.target.value);
    setSelectedTask(taskNumber);
    setTitle(readingMaterials[taskNumber].title);
    setPassage(readingMaterials[taskNumber].passage);
  };

  const handleSave = () => {
    setReadingMaterials(prev => ({
      ...prev,
      [selectedTask]: {
        title,
        passage
      }
    }));
    alert(`Task ${selectedTask} updated!`);
  };

  return (
    <div className="input-page-container">
      <h2 className="input-page-heading">Edit Task Content</h2>
      <p style={{textAlign: 'center'}}>Click Go To Practice after editing to start.</p>

      <label className="input-page-label">Select Task:</label>
      <select
        value={selectedTask}
        onChange={handleTaskChange}
        className="input-page-select"
      >
        <option value={1}>Task 1</option>
        <option value={2}>Task 2</option>
        <option value={3}>Task 3</option>
        <option value={4}>Task 4</option>
      </select>

      <label className="input-page-label">Title:</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input-page-input"
        placeholder="Enter title"
      />

      <label className="input-page-label">Passage:</label>
      <textarea
        value={passage}
        onChange={e => setPassage(e.target.value)}
        className="input-page-textarea"
        placeholder="Enter passage"
      />

      <button onClick={handleSave} className="input-page-button">Save Task</button>
    </div>
  );
};

export default InputPage;
