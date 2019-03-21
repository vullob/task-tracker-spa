import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import api from './api'
import TaskForm from './task_form.js'
class Modal extends React.Component {
    constructor (props) {
      super(props)
      this.closeModal = this.closeModal.bind(this)
      this.saveForm = this.saveForm.bind(this)
    }

  componentDidMount(){
    $('#Modal').modal("show")
  }

  saveForm(){
    const { taskForm, modal: {type}, userForm} = this.props
    switch (type){
      case 'editTask':
        api.update_task(taskForm);
        break;
      case 'createTask':
        api.create_task(taskForm);
        break;
      case 'createUser':
        api.create_user(userForm);
        break;
      default:
    }
    this.closeModal();
  }

  closeModal(){
    const action = {
      type:"HIDE_MODAL",
    }
    this.props.dispatch(action)
    $('#Modal').modal("hide")
    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    const { modal: {type}} = this.props
    return <div>
      <div className="modal fade" id="Modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {type == 'editTask' && 'Edit Task'}
                {type == 'createTask' && 'Create New Task'}
              </h5>
              <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {(type == 'editTask' || type == 'createTask') && <TaskForm/>}
              {type == 'createUser' && <UserForm/>}
            </div>
                <div className="modal-footer">
              <button onClick={this.closeModal} type="button" className="btn btn-secondary">Close</button>
              <button type="button" onClick={this.saveForm} className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default connect((state) => {return {users: state.users, selectedTask: state.selectedTask, tasks: state.tasks, taskForm: state.taskForm, modal: state.modal, userForm: state.userForm};})(Modal);
