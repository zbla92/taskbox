import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

const TaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = {
    onPinTask,
    onArchiveTask
  };

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loadng</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className='list-items'>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className='list-items'>
        <div className='wrapper-message'>
          <span className='icon-check' />
          <div className='title-message'>You have no tasks</div>
          <div className='subtitle-message'>Sit back and relax</div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter(t => t.state === 'TASK_PINNED'),
    ...tasks.filter(t => t.state !== 'TASK_PINNED')
  ];

  console.log('tasks: ', tasks);
  console.log('tasksInOrder: ', tasksInOrder);
  return (
    <div className='list-items'>
      {tasksInOrder.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.array,
  onPinTask: PropTypes.func.isRequired,
  onArchiveTask: PropTypes.func.isRequired
};

TaskList.defaultProps = {
  loading: false
};

export default TaskList;
