import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import '../App.css';

const TaskManager = () => {
  const { state, dispatch } = useContext(TaskContext);
  const { tasks } = state;
  const [filter, setFilter] = useState('all');
  const [taskText, setTaskText] = useState(''); 
  const inputRef = useRef(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      dispatch({ type: 'SET_TASKS', payload: storedTasks });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const addTask = () => {
    if (taskText.trim() !== '') {
      const newTask = {
        id: tasks.length,
        text: taskText,
        completed: false,
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setTaskText(''); 
      inputRef.current.focus();
    }
  };

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  }, [dispatch]);

  const toggleTaskCompletion = useCallback((taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  }, [dispatch]);

  return (
    <div className="modal">
      <table style={{ width: '100%', margin: 'auto' }}>
        <tbody>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center', padding: '16px' }}>
              <h2>To-Do List App</h2>
            </td>
          </tr>
          <tr>
            <td colSpan={1}>
              <input
                type="text"
                ref={inputRef}
                placeholder="Enter task"
                value={taskText}
                onChange={handleInputChange}
                style={{ width: 'calc(100% - 16px)', padding: '8px' }}
              />
            </td>
            <td style={{ width: '144px', textAlign: 'center' }}>
                <button onClick={addTask} style={{ width: '100%', padding: '8px 16px' }}>Add Task</button>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center', padding: '8px' }}>
              <div>
                <span>Filter: </span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ marginLeft: '8px', padding: '8px' }}
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  
    <table style={{ width: '100%', margin: 'auto', marginTop: '16px' }}>
        <thead>
            <tr>
            <th style={{ width: '60%', textAlign: 'center', padding: '8px', border: '1px solid #ccc' }}>Task</th>
            <th style={{ width: '20%', textAlign: 'center', padding: '8px', border: '1px solid #ccc' }}>Status</th>
            <th style={{ width: '20%',textAlign: 'center', padding: '8px', border: '1px solid #ccc' }}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredTasks.map(task => (
            <tr key={task.id}>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{task.text}</td>
                <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ccc' }}>
                <button onClick={() => toggleTaskCompletion(task.id)} style={{ padding: '4px 8px' }}>
                    {task.completed ? 'Complete' : 'Incomplete'}
                </button>
                </td>
                <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ccc' }}>
                <button onClick={() => deleteTask(task.id)} style={{ padding: '4px 8px', marginRight: '4px' }}>Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        <br></br>
        <br></br>
    </div>
  );
};

export default TaskManager;