import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Modal from './modal'

function TaskList(props) {
  let rows = _.map(props.tasks, (task) => <Task {...{key: task.id, task, dispatch: props.dispatch}} />);
  return <React.Fragment>
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Assigned To</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    {props.modal && <Modal/>}
    </React.Fragment>
}

function updateSelectedTask(task, dispatch){
  const action = {
    type: 'SET_TASK',
    data: task.id
  }
   const modalAction = {
    type: 'SHOW_TASK_MODAL',
  }
 const taskFormAction = {type: 'SET_TASK_FORM', data: task}
  dispatch(taskFormAction)
  dispatch(action)
  dispatch(modalAction)
}

function Task(props) {
  let {task, dispatch, tasks} = props;
  return <tr>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>{task.completed ? "true" : "false"}</td>
    <td>{task.user.email ? task.user.email : "not assigned"}</td>
    <td><button className="btn btn-secondary" onClick={(e) => updateSelectedTask(task, dispatch)}>Edit</button></td>
  </tr>
}

export default connect((state) => {return {tasks: state.tasks, modal: state.taskModal, selectedTask: state.selectedTask};})(TaskList);

