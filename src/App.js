import React from 'react';
import ReactDOM from 'react-dom/client';
import TaskManager from './components/TaskManager';
import { TaskProvider } from './context/TaskContext';
import reportWebVitals from './reportWebVitals';

const App = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <TaskProvider>
        <TaskManager />
      </TaskProvider>
    </React.StrictMode>
  );

  reportWebVitals();

  return null;
};

export default App;
