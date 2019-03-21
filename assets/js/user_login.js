import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import api from './api';

class UserLogin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
    }
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRegister = this.onRegister.bind(this)
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value});
  }

  onEmailChange(e) {
    this.setState({email: event.target.value});
  }

  onRegister() {
    const {email, password} = this.state;
    api.create_user(email, password)
    api.fetch_users();
    api.fetch_tasks();
  }

  onSubmit() {
    const {email, password} = this.state;
    api.create_session(email, password);
    api.fetch_users();
    api.fetch_tasks();
  }

  render() {
    return <div className="row">
              <div className="col-4">
                <input type="email" placeholder="Email" className="form-control" onChange={this.onEmailChange}></input>
              </div>
              <div className="col-4">
                <input type="password" placeholder="Password" className="form-control" onChange={this.onPasswordChange}></input>
              </div>
              <div className="col-2">
                <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Login</button>
              </div>
              <div className="col-2">
                <button type="button" className="btn btn-primary" onClick={this.onRegister}>Register</button>
              </div>
            </div>
  }
}

export default UserLogin

