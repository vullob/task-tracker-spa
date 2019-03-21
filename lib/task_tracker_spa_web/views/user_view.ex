defmodule TaskTrackerSpaWeb.UserView do
  use TaskTrackerSpaWeb, :view
  alias TaskTrackerSpaWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user_with_tasks.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email }
  end

  def render("user_with_tasks.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      tasks: render_many(user.tasks, TaskTrackerSpaWeb.TaskView, "task.json")}
  end

end
