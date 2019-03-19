import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import $ from 'jquery';
import api from './api'

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
  }

  render() {
    return <div>
        <div>
          <p>working</p>
        </div>
    </div>
    }
}
