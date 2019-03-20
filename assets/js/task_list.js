import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

function TaskList(props) {
  let rows = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
  return <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
}

function Task(props) {
  let {task} = props;
  return <tr>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>{task.completed ? "true" : "false"}</td>
  </tr>
}

export default connect((state) => {return {tasks: state.tasks};})(TaskList);

