defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string, null: true, default: ""
    field :minutes_spent, :integer, null: false, default: 0
    field :title, :string, null: false
    belongs_to :user, TaskTrackerSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :user_id, :minutes_spent])
    |> foreign_key_constraint(:user_id, [message: "user not found"])
    |> validate_length(:title)
    |> validate_length(:description)
    |> validate_minutes_spent(:minutes_spent)
    |> validate_required([:title, :description, :completed])
  end

  def validate_length(changeset, field) do
    validate_change(changeset, field, fn _, name ->
    cond do
      String.length(name) > 255 && field == :title -> [title: "input cannot be longer than 255 characters"]
      String.length(name) > 255 && field == :description -> [description: "input cannot be longer than 255 characters"]
      true -> []
    end
    end)
  end

  def validate_minutes_spent(changeset, field) do
    validate_change(changeset, field,  fn _, mins ->
      cond do
        rem(mins, 15) != 0 -> [minutes_spent: "minutes spent must be in 15 minute increments"]
        mins < 0 -> [minutes_spent: "minutes spent must be positive"]
        true -> []
      end
      end)
  end
end
