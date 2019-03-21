import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class LoginText extends React.Component {
  constructor(props){
    super(props)
  }

  getLoggedInUser(session, users) {
    if (users && session) {
     return users.find((elem) => elem.id == session["user_id"])
    }
  }

  render() {
    const { session, users } = this.props;
    const  user  = this.getLoggedInUser(session, users);
    return <div>
      {!user && <div> <div className="row">
                  <div className="col">
                    <h1>Welcome To Task Tracker</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p>Please log in or register to get started.</p>
                  </div>
                </div>
              </div>}
    </div>
  }
}

export default connect((state) => {return {users: state.users,session: state.session};})(LoginText);


