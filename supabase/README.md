# Setup supabase database

- Sign in to [supabase.com](https://supabase.com)
- Download the [db.sql](/supabase/db.sql) file
- Install postgresql on your system (Get access to `psql` command)
- Run `psql -h db.database-id.supabase.co -p 5432 -d postgres -U postgres -f db.sql`
  - Enter the password
  - Wait for the operation to complete
- Copy the url and public key and use as the environment variable
