import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

function UserList(props) {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return  <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
}

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
  </tr>
}

export default connect((state) => {return {users: state.users};})(UserList);

