import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class UserForm extends React.Component {
    constructor (props) {
      super(props)
      this.changeEmail = this.changeEmail.bind(this)
      this.changePassword = this.changePassword.bind(this)
    }


    changeEmail(e){
      this.props.dispatch({type: 'UPDATE_USER_EMAIL', data: e.target.value})
    }

    changePassword(e){
      this.props.dispatch({type: 'UPDATE_USER_PASSWORD', data: e.target.value})
    }


  render() {
    const {email, password} = this.props
    return <React.Fragment>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" id="email" value={email} onChange={this.changeEmail}/>
                  </div>
                </div>
                 <div className="row">
                  <div className="col-12">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" id="password" type="password" value={password} onChange={this.changePassword}/>
                  </div>
                </div>
           </React.Fragment>
  }
}

export default connect((state) => {return { ...state.userForm };})(UserForm);
