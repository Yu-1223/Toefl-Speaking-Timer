import React, { useState, useEffect, useCallback } from 'react';

const TASKS = {
  1: { prepTime: 15, speakTime: 45, readingTime: 0, hasListening: false },
  2: { prepTime: 30, speakTime: 60, readingTime: 45, hasListening: true },
  3: { prepTime: 30, speakTime: 60, readingTime: 45, hasListening: true },
  4: { prepTime: 20, speakTime: 60, readingTime: 0, hasListening: true },
};

const SpeakingTimer = ( {readingMaterials} ) => {
  const [currentTask, setCurrentTask] = useState(1);
  const [readingTime, setReadingTime] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [speakTime, setSpeakTime] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [paused, setPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const taskInfo = TASKS[currentTask];

  const startListening = useCallback(() => {
    setPhase('listening');
    setPaused(false);
  }, []);
  
  const startPrepTimer = useCallback(() => {
    setPrepTime(taskInfo.prepTime);
    setPhase('prep');
    setPaused(false);
  }, [taskInfo]);
  
  const startSpeakTimer = useCallback(() => {
    setSpeakTime(taskInfo.speakTime);
    setPhase('speaking');
    setPaused(false);
  }, [taskInfo]);
  
  const startTaskFor = useCallback((taskNumber) => {
    const task = TASKS[taskNumber];
    setPaused(false);

    console.log(taskNumber)

    if (taskNumber === 1) {
      setHasStarted(true); 
    }
  
    if (task.readingTime > 0) {
      setReadingTime(task.readingTime);
      setPhase('reading');
    } else if (task.hasListening) {
      startListening();
    } else {
      startPrepTimer();
    }
  }, [startListening, startPrepTimer]);
  
  

  useEffect(() => {
    let timer;
  
    if (!paused) {
      if (phase === 'reading' && readingTime > 0) {
        timer = setTimeout(() => setReadingTime(readingTime - 1), 1000);
      } else if (phase === 'reading' && readingTime === 0) {
        alert('Reading time is over!');
        if (taskInfo.hasListening) {
          startListening();
        } else {
          startPrepTimer();
        }
      }
  
      if (phase === 'prep' && prepTime > 0) {
        timer = setTimeout(() => setPrepTime(prepTime - 1), 1000);
      } else if (phase === 'prep' && prepTime === 0) {
        alert('Preparation time is over! Start speaking!');
        startSpeakTimer();
      }
  
      if (phase === 'speaking' && speakTime > 0) {
        timer = setTimeout(() => setSpeakTime(speakTime - 1), 1000);
      } else if (phase === 'speaking' && speakTime === 0) {
        alert('Speaking time is over!');
  
        if (currentTask < 4) {
          const next = currentTask + 1;
          setCurrentTask(next);
          startTaskFor(next); 
        } else {
          alert('You have finished all tasks!');
          setPhase('done');
        }
      }
    }
  
    return () => clearTimeout(timer);
  }, [
    readingTime,
    prepTime,
    speakTime,
    phase,
    paused,
    startPrepTimer,
    startSpeakTimer,
    startListening,
    taskInfo,
    currentTask,
    startTaskFor,
  ]);
  
  

  const startTask = () => {
    setPaused(false);
    setHasStarted(true); 
  
    if (taskInfo.readingTime > 0) {
      setReadingTime(taskInfo.readingTime);
      setPhase('reading');
    } else if (taskInfo.hasListening) {
      startListening();
    } else {
      startPrepTimer();
    }
  };
  

  // 🔧 Restart task function
  const restartTask = () => {
    setCurrentTask(1)
    setReadingTime(TASKS[1].readingTime);
    setPrepTime(TASKS[1].prepTime);
    setSpeakTime(TASKS[1].speakTime);
    setPhase('idle');
    setPaused(false);
    setHasStarted(false);
  };

  const togglePause = () => {
    setPaused((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      { hasStarted ? (
        <h2 style={{ textAlign: 'center' }}>Task {currentTask}</h2>
      ) : (
        <h2 style={{ textAlign: 'center' }}>Start Speaking Section</h2>
      )}
      

      {/* ✅ Show reading box only during reading or prep */}
      {(phase === 'reading' || (phase === 'prep' && currentTask === 1)) && (
        <div style={styles.readingBox}>
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {readingMaterials[currentTask].title}
          </p>
          <p style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            {readingMaterials[currentTask].passage}
          </p>
        </div>
      )}

      {/* ✅ Listening Section */}
      {phase === 'listening' && (
        <div style={styles.listeningBox}>
          <p><strong>Listening Section:</strong></p>
          <p>[Play Audio Here]</p>
          {/* If you have an audio player, replace this with <audio> or your player component */}
          <button onClick={startPrepTimer} style={styles.button}>
            Finished Listening? Start Preparation
          </button>
        </div>
      )}

      <div style={styles.controlButton}>
        {/* ✅ Timers */}
        {phase === 'reading' && <p>Reading Time: {readingTime} sec</p>}
        {phase === 'prep' && <p>Preparation Time: {prepTime} sec</p>}
        {phase === 'speaking' && <p>Speaking Time: {speakTime} sec</p>}

        <div style={styles.controlButtonGroup}>
          {phase === 'idle' && currentTask === 1 && (
            <button onClick={startTask} style={styles.button}>
              Start
            </button>
          )}

          {phase !== 'idle' && phase !== 'listening' && (
            <button onClick={togglePause} style={styles.button}>
              {paused ? 'Resume' : 'Pause'}
            </button>
          )}
          {hasStarted && (
            <button
              onClick={restartTask}
              style={{ ...styles.button, backgroundColor: '#FA8072' }}
            >
              Restart All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  readingBox: {
    border: '1px solid #ccc',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    textAlign: 'left',
  },
  listeningBox: {
    border: '1px solid #007bff',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#e6f2ff',
    borderRadius: '8px',
  },
  button: {
    margin: '5px',
    cursor: 'pointer',
    backgroundColor: 'gray',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '130px',
  },
  controlButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default SpeakingTimer;
