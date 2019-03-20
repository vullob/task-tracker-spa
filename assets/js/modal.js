import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class Modal extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        title: "",
        description: "",
        completed: false,
        user: {
          email:  ""
        }
      }
      this.changeDescription = this.changeDescription.bind(this)
      this.changeAssignedUser = this.changeAssignedUser.bind(this)
      this.changeDescription = this.changeDescription.bind(this)
      this.changeCompleted = this.changeCompleted.bind(this)
      this.changeTitle = this.changeTitle.bind(this)
    }

  componentDidMount(){
    const {title, description, completed, user} = this.props.tasks.find((t) => t.id == this.props.selectedTask) || {}
    this.setState({title, description, completed, user})
    $('#taskModal').modal("show")
  }

  changeDescription(event) {
    this.setState({description: event.target.value});
  }

  changeAssignedUser(event) {
    const { users } = this.props;
    const user = users.find((u) => u.id == event.target.value);
    this.setState({ user });
  }

  changeDescription(e) {
    this.setState({description: e.target.value})
  }

  changeCompleted(e) {
    this.setState({completed: e.target.value})
  }

  changeTitle(e){
    this.setState({title: e.target.value})
  }

  getUserSelect(){
    const { users } = this.props;
    debugger
    return users.map((user) => <option key={user.id} value={user.id}>{user.email}</option>);
  }

  render() {
    const {title,
             completed,
             description,
             user: {email}} = this.state
    //TODO finish form
    return <div>
      <div className="modal fade" id="taskModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                    <input className="form-control" id="completed" type="checkbox" onChange={this.changeCompleted} value={completed}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="assignedUser">Assigned User</label>
                    <select className="form-control" id="assignedUser" onChange={this.changeAssignedUser}>
                      {this.getUserSelect()}
                    </select>
                  </div>
                </div>
               </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default connect((state) => {return {users: state.users, selectedTask: state.selectedTask, tasks: state.tasks };})(Modal);
