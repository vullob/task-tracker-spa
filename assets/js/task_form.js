import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class TaskForm extends React.Component {
    constructor (props) {
      super(props)
      this.changeDescription = this.changeDescription.bind(this)
      this.changeAssignedUser = this.changeAssignedUser.bind(this)
      this.changeDescription = this.changeDescription.bind(this)
      this.changeCompleted = this.changeCompleted.bind(this)
      this.changeTitle = this.changeTitle.bind(this)
      this.changeMinutesSpent = this.changeMinutesSpent.bind(this)
    }

  changeDescription(event) {
    this.props.dispatch({type: 'UPDATE_TASK_DESCRIPTION', data: event.target.value});
  }

  changeAssignedUser(event) {
    const { users } = this.props;
    let user;
    if(event.target.value == 0){
      user = {id: 0, email: ""}
    } else {
      user = users.find((u) => u.id == event.target.value);
    }

    this.props.dispatch({type: 'UPDATE_TASK_USER', data: user});
  }

  changeDescription(e) {
    this.props.dispatch({type: 'UPDATE_TASK_DESCRIPTION', data: e.target.value})
  }

  changeCompleted(e) {
    this.props.dispatch({type: 'UPDATE_TASK_COMPLETED', data: e.target.checked})
  }

  changeTitle(e){
    this.props.dispatch({type: 'UPDATE_TASK_TITLE', data: e.target.value})
  }

  changeMinutesSpent(e){
    this.props.dispatch({type: 'UPDATE_TASK_MINUTES', data: e.target.value})
  }

  getUserSelect(){
    const { users } = this.props;
    const userOptions = users.map((user) => <option key={user.id} value={user.id}>{user.email}</option>);
    userOptions.push(<option value={0}></option>)
    return userOptions
  }

  render() {
    const {title,
             completed,
             description,
      user,
    minutes_spent} = this.props
    return <React.Fragment>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" type="text" id="title" value={title} onChange={this.changeTitle}/>
                  </div>
                </div>
                 <div className="row">
                  <div className="col-12">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" id="description" type="text" value={description} onChange={this.changeDescription}/>
                  </div>
                </div>
               <div className="row">
                   <div className="col-12">
                    <label htmlFor="completed">Completed</label>
                    <input className="form-control" id="completed" type="checkbox" onChange={this.changeCompleted} checked={completed}/>
                  </div>
                </div>
               <div className="row">
                   <div className="col-12">
                    <label htmlFor="minutesSpent">Minutes Spent</label>
                    <input className="form-control" id="completed" step={15} min={0} type="number" onChange={this.changeMinutesSpent} value={minutes_spent}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="assignedUser">Assigned User</label>
                    <select className="form-control" value={user ? user.id : 0}id="assignedUser" onChange={this.changeAssignedUser}>
                      {this.getUserSelect()}
                    </select>
                  </div>
                </div>
           </React.Fragment>
  }
}

export default connect((state) => {return {
                                            users: state.users,
                                            selectedTask: state.selectedTask,
                                            tasks: state.tasks,
                                            ...state.taskForm
                                          };})(TaskForm);
