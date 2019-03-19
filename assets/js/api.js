import store from './store'


class TheServer {
  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  create_session(email, password) {
    this.send_post("/api/v1/sessions",
      {email, password},
      (resp) => {
        store.dispatch({
          type: "NEW_SESSION",
          data: resp.data,
        });
      });
  }
}

export default new TheServer()
