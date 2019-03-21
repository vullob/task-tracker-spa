defmodule TaskTrackerSpa.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :description, :string, null: false, default: ""
      add :completed, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nilify_all), null: true, default: nil
      add :minutes_spent, :integer, null: false, default: 0
      timestamps()
    end
  end
end
