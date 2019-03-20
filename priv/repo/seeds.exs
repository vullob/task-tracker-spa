# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTrackerSpa.Repo.insert!(%TaskTrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TaskTrackerSpa.Repo
alias TaskTrackerSpa.Users.User
alias TaskTrackerSpa.Tasks.Task


pwhash = Argon2.hash_pwd_salt("pass1")


Repo.insert!(%User{
        email: "brian.vullo@gmail.com",
        password_hash: pwhash
        })

Repo.insert!(%Task{
        completed: false,
        title: "test",
        description: "",
        user_id: 1})
