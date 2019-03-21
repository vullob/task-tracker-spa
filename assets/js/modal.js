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
    $('#Modal').modal({keyboard: false, backdrop: "static"})
  }

  saveForm(){
    const { taskForm, modal: {type, errors}, userForm, dispatch} = this.props
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
  }

  closeModal(){
    const clearModalErrors = {
          type: "CLEAR_MODAL_ERRORS",
        }
    const action = {
      type:"HIDE_MODAL",
    }
    this.props.dispatch(clearModalErrors)
    this.props.dispatch(action)
    $('#Modal').modal("hide")
    api.fetch_tasks();
    api.fetch_users();
  }

  renderModalErrors(){
    const { modal: {errors} } = this.props
    console.log(errors)
    return errors.map((e) =>  <div className="alert alert-danger">
                          <strong>An Error Occurred</strong>{e}</div>)
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
              {this.renderModalErrors()}
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
