//Redux Store

import { createStore } from 'redux';

// Actions
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK'
};

// Action Creators
export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });

// All our reducers simply change the state of a single task.
const taskStateReducer = taskState => {
  return (state, action) => {
    return {
      ...state,
      tasks: state.task.map(task =>
        task.id === action.id ? { ...task, state: taskState } : task
      )
    };
  };
};

// Reducer
export const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case actions.ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case actions.PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
  }
};

// The initial state of our store when the app loads.
// Usually you would fetch this from a server

const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' }
];

// Exporting the contructed redux store
export default createStore(reducer, { tasks: defaultTasks });
