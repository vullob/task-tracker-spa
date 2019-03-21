import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import api from './api';
import UserLogin from './user_login'
class UserInfo extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  getLoggedInUser(session, users) {
    if (users && session) {
     return users.find((elem) => elem.id == session["user_id"])
    }
  }

  logout(){
    const { dispatch } = this.props;
    dispatch({
      type: 'CLOSE_SESSION'
    })
  }

  render() {
    const { session, users } = this.props;
    const  user  = this.getLoggedInUser(session, users);
    return <div>
      {user && <div className="row">
                  <div className="col">
                    <p>User: {user.email}</p>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-primary" onClick={this.logout}>Logout</button>
                  </div>
                </div>}
      {!user && <UserLogin/>}
    </div>
  }
}

export default connect((state) => {return {users: state.users, session: state.session};})(UserInfo);


