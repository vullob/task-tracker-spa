import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

function TaskList(props) {
  let rows = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
  return <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
}

function Task(props) {
  let {task} = props;
  return <tr>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>{task.completed ? "true" : "false"}</td>
    <td>{task.user.email ? task.user.email : "not assigned"}</td>
  </tr>
}

export default connect((state) => {return {tasks: state.tasks};})(TaskList);

