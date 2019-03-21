import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

function UserList(props) {
  const { session } = props
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return  <React.Fragment>
    {session && <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>}
    </React.Fragment>
}

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
  </tr>
}

export default connect((state) => {return {session: state.session, users: state.users};})(UserList);

