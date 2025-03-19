import React, { useState, useEffect, useCallback } from 'react';

const SingleTask = ({ task, title, passage }) => {
    const [readingTime, setReadingTime] = useState(0);
    const [prepTime, setPrepTime] = useState(0);
    const [speakTime, setSpeakTime] = useState(0);
    const [phase, setPhase] = useState('idle');
    const [paused, setPaused] = useState(false);
  
    const taskSettings = {
      1: { prepTime: 15, speakTime: 45, readingTime: 0, hasListening: false },
      2: { prepTime: 30, speakTime: 60, readingTime: 45, hasListening: true },
      3: { prepTime: 30, speakTime: 60, readingTime: 45, hasListening: true },
      4: { prepTime: 20, speakTime: 60, readingTime: 0, hasListening: true },
    };
  
    const taskInfo = taskSettings[task];
  
    const startListening = () => {
      setPhase('listening');
      setPaused(false);
    };
  
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
          setPhase('idle');
        }
      }
  
      return () => clearTimeout(timer);
    }, [readingTime, prepTime, speakTime, phase, paused, startPrepTimer, startSpeakTimer, taskInfo]);
  
    const startTask = () => {
      setPaused(false);
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
      setReadingTime(0);
      setPrepTime(0);
      setSpeakTime(0);
      setPhase('idle');
      setPaused(false);
    };
  
    const togglePause = () => {
      setPaused((prev) => !prev);
    };
  
    return (
      <div style={styles.container}>
        <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Task {task}</h2>
  
        {/* ✅ Show reading material if in reading/prep */}
        {(phase === 'reading' || (phase === 'prep' && task === 1)) && (
          <div style={styles.readingBox}>
            <p style={{ fontWeight: 'bold', textAlign: 'center' }}>{title}</p>
            <p style={{ whiteSpace: 'pre-wrap', textAlign: 'left'}}>{passage}</p>
          </div>
        )}
  
        {/* ✅ Listening phase */}
        {phase === 'listening' && (
          <div style={styles.listeningBox}>
            <p><strong>Listening Section:</strong></p>
            <p>[Play Audio Here]</p>
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
            {/* ✅ Control buttons */}
            {phase === 'idle' && (
              <button onClick={startTask} style={styles.button}>
                Start
              </button>
            )}
      
            {phase !== 'idle' && phase !== 'listening' && (
              <button onClick={togglePause} style={styles.button}>
                {paused ? 'Resume' : 'Pause'}
              </button>
            )}
      
            {/* ✅ Restart Button always visible */}
            <button onClick={restartTask} style={{ ...styles.button, backgroundColor: '#FA8072' }}>
              Restart
            </button>
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
  },
  listeningBox: {
    border: '1px solid #007bff',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#e6f2ff',
    borderRadius: '8px',
  },
  button: {
    margin: '10px',
    backgroundColor: 'gray',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '100px',
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

export default SingleTask;
