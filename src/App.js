import React, { useState, useEffect } from 'react';
import SpeakingTimer from './components/SpeakingTimer';
import SingleTask from './components/SingleTask';
import InputPage from './components/InputPage'; // import the new component
import './App.css';

function App() {
  const [task, setTask] = useState("task 1");
  const [showInputPage, setShowInputPage] = useState(true); // toggle between pages
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(false); // close sidebar on big screen
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [readingMaterials, setReadingMaterials] = useState({
    1: { title: '', passage: `Do you agree or disagree with the following statement?\nAll workers should be required to stop working and retire by age 65.\nUse details and examples to explain your opinion.` },
    2: { title: 'University Should Close Parking Area', passage: `I think the university should close the large parking lot near the main classroom building on campus, Thomas Hall. This lot occupies a large space in the center of campus. Closing it to vehicle parking would have two big benefits. First, the space could be turned into a pleasant, grassy area. And second, since this would reduce the traffic on campus, students will be more likely to ride their bikes or walk to classes.\nQuestion: The woman expresses her opinion about the student' s letter in the campus paper. Briefly summarize the proposal in the letter. Then state the woman's opinion about the proposal, and explain the reasons she gives for holding that opinion.` },
    3: { title: 'Negative Phototaxis', passage: `While many organisms need light to survive, certain animals that live in dark environments need to avoid light because it threatens their survival. When exposed to light from the Sun or another source, these animals move away from the light, seeking darkness. This movement pattern is called negative phototaxis. Negative phototaxis allows animals to avoid the dangerous effects of being exposed to light. In order to be able to move away from light, these animals often have speciàl physical features that allow them to sense the presence of light, since they live in the dark and may not have fully developed vision.\nQuestion: Explain how the example ofthe earthworm illustrates negative phototaxis.` },
    4: { title: '', passage: `Listening Only` }
  });

  return (
    <div className="app-container">
      {isMobile && (
        <header className='header-mobile'>
          <div className='logo'>
            <img src='/logo.png' alt='logo' style={{ width: '30px', height: '30px' }} />
            <h3 style={{ textAlign: 'center' }}>TOEFL Speaking Timer</h3>
          </div>
          <button onClick={() => setShowSidebar(!showSidebar)} className="menu-toggle">
              <img src='/menu.png' alt='open menu' className='sidebar-icon' />
          </button>
        </header>
      )}
      {/* Sidebar - appears on mobile when toggled, always hidden on desktop */}
      {isMobile && (
        <aside className={`sidebar ${showSidebar ? 'show' : ''}`}>
          {/* Content of sidebar is header-buttons on mobile */}
          <div className='sidebar-content'>
            <div> 
              <button onClick={() => setShowSidebar(!showSidebar)} className="close-toggle">
                  <img src='/close.png' alt='close menu' className='sidebar-icon' />
              </button>
            </div>
            <div>
            <button onClick={() => {setShowInputPage(true); setShowSidebar(false);}} className="sidebar-button">
              Edit Tasks
            </button>
            <button onClick={() => {setTask("task 1"); setShowInputPage(false); setShowSidebar(false);}} className="sidebar-button">
              Practice Task 1
            </button>
            <button onClick={() => {setTask("task 2"); setShowInputPage(false); setShowSidebar(false);}} className="sidebar-button">
              Practice Task 2
            </button>
            <button onClick={() => {setTask("task 3"); setShowInputPage(false); setShowSidebar(false);}} className="sidebar-button">
              Practice Task 3
            </button>
            <button onClick={() => {setTask("task 4"); setShowInputPage(false); setShowSidebar(false);}} className="sidebar-button">
              Practice Task 4
            </button>
            <button onClick={() => {setTask("all task"); setShowInputPage(false); setShowSidebar(false);}} className="sidebar-button">
              Practice All Tasks
            </button>
            </div>
            
          </div>
        </aside>
      )}

      {/* Desktop Header (full content including buttons) */}
      {!isMobile && (
        <header className="header">
          <div className='logo'>
            <img src='/logo.png' alt='logo' style={{ width: '30px', height: '30px' }} />
            <h2 style={{ textAlign: 'center' }}>TOEFL Speaking Timer</h2>
          </div>
          <div className='header-button'>
            <button onClick={() => setShowInputPage(true)} className="button button-gray">
              Edit Tasks
            </button>
            <button onClick={() => {setTask("task 1"); setShowInputPage(false);}} className="button button-blue">
              Practice Task 1
            </button>
            <button onClick={() => {setTask("task 2"); setShowInputPage(false);}} className="button button-blue">
              Practice Task 2
            </button>
            <button onClick={() => {setTask("task 3"); setShowInputPage(false);}} className="button button-blue">
              Practice Task 3
            </button>
            <button onClick={() => {setTask("task 4"); setShowInputPage(false);}} className="button button-blue">
              Practice Task 4
            </button>
            <button onClick={() => {setTask("all task"); setShowInputPage(false);}} className="button button-green">
              Practice All Tasks
            </button>
          </div>
        </header>
      )}



      {!showInputPage ? (
        <>
          {task === "task 1" && (
            <SingleTask task={1} title={readingMaterials[1].title} passage={readingMaterials[1].passage} />
          )}
          {task === "task 2" && (
            <SingleTask task={2} title={readingMaterials[2].title} passage={readingMaterials[2].passage} />
          )}
          {task === "task 3" && (
            <SingleTask task={3} title={readingMaterials[3].title} passage={readingMaterials[3].passage} />
          )}
          {task === "task 4" && (
            <SingleTask task={4} title={readingMaterials[4].title} passage={readingMaterials[4].passage} />
          )}
          {task === "all task" && (
            <SpeakingTimer readingMaterials={readingMaterials} />
          )}
        </>
      ) : (
        <>
          <InputPage readingMaterials={readingMaterials} setReadingMaterials={setReadingMaterials} isMobile={isMobile}/>
          <button onClick={() => {setTask("all task"); setShowInputPage(false);}} style={{margin: '20px'}} className="button button-gray">Go To Practice</button>
        </>
      )}
      <footer className="footer">
        <p>Created by 🐳💜</p>
        <a href='https://github.com/Yu-1223/Toefl-Speaking-Timer.git' target='_blank' rel="noreferrer">
          <img src='/github.svg' alt='github' style={{objectFit: 'contain', width: '20px', height: '20px'}}/>
        </a>
      </footer>
    </div>
  );
}

export default App;
