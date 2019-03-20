import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import api from './api';
import UserLogin from './user_login'
class UserInfo extends React.Component {
  constructor(props){
    super(props)
  }

  getLoggedInUser() {
    const { users, session } = this.props
    if (users && session) {
     return users.find((elem) => elem.id == session["user_id"])
    }
  }

  render() {
    const  user  = this.getLoggedInUser();
    return <div>
      {user && <p>User: {user.email}</p>}
      {!user && <UserLogin/>}
    </div>
  }
}

export default connect((state) => {return {users: state.users, session: state.session};})(UserInfo);


