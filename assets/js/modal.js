import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import TaskForm from './task_form.js'
class Modal extends React.Component {
    constructor (props) {
      super(props)
      this.closeModal = this.closeModal.bind(this)
    }

  componentDidMount(){
    $('#taskModal').modal("show")
  }

  closeModal(){
    const action = {
      type:"HIDE_TASK_MODAL",
    }
    this.props.dispatch(action)
    $('#taskModal').modal("hide")
  }

  render() {
    return <div>
      <div className="modal fade" id="taskModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="close" onClick={this.closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <TaskForm/>
            </div>
                <div className="modal-footer">
              <button onClick={this.closeModal} type="button" className="btn btn-secondary">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default connect((state) => {return {users: state.users, selectedTask: state.selectedTask, tasks: state.tasks };})(Modal);
