import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Modal from './modal'
import api from './api'

function TaskList(props) {
  const { session } = props
  let rows = _.map(props.tasks, (task) => <Task {...{key: task.id, task, dispatch: props.dispatch}} />);
  return <React.Fragment>
    {session && <button type="button" className="btn btn-primary btn-lg" onClick={() => createTask(props.dispatch)}>Create New Task</button>}
    {session && <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Assigned To</th>
            <th>Minutes Spent</th>
            <th>Completed</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>}
    {props.modal.show && <Modal/>}
    </React.Fragment>
}

function deleteTask(task){
  api.delete_task(task)
}

function createTask(dispatch) {
  const modalAction = {
    type: 'SHOW_MODAL'
  }
  const modalType = {
    type: 'SET_MODAL_TYPE',
    data: 'createTask'
  }
  const taskFormAction = {
    type: 'RESET_TASK_FORM'
  }

  dispatch(taskFormAction)
  dispatch(modalType)
  dispatch(modalAction)
}

function updateSelectedTask(task, dispatch){
  const action = {
    type: 'SET_TASK',
    data: task.id
  }
  const modalAction = {
    type: 'SHOW_MODAL'
  }
  const modalType = {
    type: 'SET_MODAL_TYPE',
    data: 'editTask'
  }
 const taskFormAction = {type: 'SET_TASK_FORM', data: task}
  dispatch(modalType)
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
    <td>{task.user ? task.user.email : "not assigned"}</td>
    <td>{task.minutes_spent}</td>
    <td>{task.completed ? 'yes' : 'no'}</td>
    <td><button className="btn btn-secondary" onClick={(e) => updateSelectedTask(task, dispatch)}>Edit</button></td>
    <td><button className="btn btn-danger" onClick={() => deleteTask(task)}>Delete</button></td>
  </tr>
}

export default connect((state) => {return {session: state.session, tasks: state.tasks, modal: state.modal, selectedTask: state.selectedTask};})(TaskList);

