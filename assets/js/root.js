import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import $ from 'jquery';

import api from './api'
import UserList from './user_list'
import UserInfo from './user_info'
import TaskList from './task_list'
import Modal from './modal'
export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root products={window.products} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    api.create_session("brian.vullo@gmail.com", "pass1");
    api.fetch_users();
    api.fetch_tasks();
  }

  render() {
    const { user } = this.props
    return <div className="container" style={{height: "100vh"}, {width: "100vw"}}>
      <Router>
        <Header/>
        <div>
          <div className="row" style={{paddingTop: "70px"}}>
            <Route path="/users" exact={true} component={UserList}/>
            <Route path="/tasks" exact={true} component={TaskList}/>
          </div>
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
        </div>
      </Router>
    </div>
    }
}

function Header(props) {
 return <div className="row my-2">
            <div className="col-4">
              <h1><Link to="/">Task Tracker</Link></h1>
              </div>
              <div className="col-2">
                  <h2>
                    <Link to="/users">Users</Link>
                  </h2>
              </div>
              <div className="col-2">
                   <h2>
                    <Link to="/tasks">Tasks</Link>
                  </h2>
                </div>
              <div className="col-4">
                <UserInfo/>
            </div>
          </div>
}
