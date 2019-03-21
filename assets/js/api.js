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

  fetch_users() {
    this.fetch_path(
      "api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data
        })
      })
  }

  fetch_tasks() {
    this.fetch_path(
      "api/v1/tasks",
      (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data
        })
      })
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

  create_user(email, password) {
    this.send_post('/api/v1/users',
      {user: {email, password}},
      (resp) => {
        console.log(resp.data)
      })
  }

  create_task(task) {
    const newId = task.user ? task.user.id : 0;
    this.send_post('/api/v1/tasks',
      {task: {...task, user_id: newId}},
      (resp) => {
        console.log(resp.data)})
  }

  send_put(path, data, callback, error) {
    $.ajax(path, {
      method: "patch",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
      error: error
    });
  }

  update_task(task) {
    const newId = task.user ? task.user.id : 0;
    this.send_put(`/api/v1/tasks/${task.id}`,
      {id: task.id, task: {...task, user_id: newId}},
      (resp) => {
        store.dispatch({
          type: "CLEAR_MODAL_ERRORS",
        })
        const action = {
          type:"HIDE_MODAL",
        }
        $('#Modal').modal("hide")
        store.dispatch(action)
        this.fetch_tasks();
        this.fetch_users();
        console.log(resp.data)
      },
      (resp) => {
        store.dispatch({
              type: "SET_MODAL_ERRORS",
              data: Object.values(Object.values(resp.responseJSON)[0]).flatMap((e) => e)
          })

      })
  }
}

export default new TheServer()
