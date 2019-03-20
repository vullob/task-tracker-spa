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
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value});
  }

  onEmailChange(e) {
    this.setState({email: event.target.value});
  }

  onSubmit() {
    const {email, password} = this.state;
    api.create_session(email, password);
    api.fetch_users();
    api.fetch_tasks();
  }

  render() {
    return <div className="form-inline">
              <input type="email" placeholder="Email" className="form-control" onChange={this.onEmailChange}></input>
              <input type="password" placeholder="Password" className="form-control" onChange={this.onPasswordChange}></input>
              <button type="button" className="btn btn-default" onClick={this.onSubmit}>Submit</button>
          </div>
  }
}

export default UserLogin

