##Design Choices

* Session tokens are stored in the window's sessionstorage to allow them to
  persist over page reloads
   * sessions do not persist over tabs/different visits to mimimize outliving the
     life of a token
* Users cannot be removed
  * no admins/people that are authorized to do this - while a user could delete
    themselves, the email is essentially used as a username, and there is little
    advantage to deleting users aside from no longer storing thair email in our
    database.


##TaskTrackerSpa

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
