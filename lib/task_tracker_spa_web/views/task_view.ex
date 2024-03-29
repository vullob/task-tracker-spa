defmodule TaskTrackerSpaWeb.TaskView do
  use TaskTrackerSpaWeb, :view
  alias TaskTrackerSpaWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task_with_user.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task_with_user.json", %{task: task}) do
    %{id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        minutes_spent: task.minutes_spent,
        user: render_one(task.user, TaskTrackerSpaWeb.UserView, "user.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      minutes_spent: task.minutes_spent,
      }
  end
end
