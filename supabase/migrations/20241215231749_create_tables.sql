-- users table, 
CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" primary key,
    "phone_number" "text" UNIQUE,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);

ALTER TABLE ONLY "public"."users" OWNER TO "postgres";

ALTER TABLE ONLY "public"."users" ENABLE ROW LEVEL SECURITY;

ALTER TABLE ONLY "public"."users" 
    drop constraint if exists "users_id_fkey",
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

DROP POLICY IF EXISTS "Users can see their own user." ON "public"."users";
CREATE POLICY "Users can see their own user." ON "public"."users" FOR SELECT
TO authenticated
USING (("id" = "auth"."uid"()));

CREATE TABLE IF NOT EXISTS "public"."notes" (
    "id" "uuid" primary key,
    "user_id" "uuid" NOT NULL,
    "title" "text",
    "content" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);

create index if not exists "notes_user_id_index" on "public"."notes" ("user_id");

ALTER TABLE ONLY "public"."notes"
    drop constraint if exists "notes_user_id_fkey",
    ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE "public"."notes" OWNER TO "postgres";

ALTER TABLE "public"."notes" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can see their own notes." ON "public"."notes";
CREATE POLICY "Users can see their own notes." ON "public"."notes" FOR SELECT 
TO authenticated
USING (("user_id" = "auth"."uid"()));

DROP POLICY IF EXISTS "Users can insert notes." ON "public"."notes";
CREATE POLICY "Users can insert notes." ON "public"."notes" FOR INSERT 
TO authenticated 
WITH CHECK (("user_id" = "auth"."uid"()));

DROP POLICY IF EXISTS "Users can update their own notes." ON "public"."notes";
CREATE POLICY "Users can update their own notes." ON "public"."notes" FOR UPDATE 
TO authenticated 
USING (("user_id" = "auth"."uid"())) -- existing row is owned by the user
WITH CHECK (("user_id" = "auth"."uid"())); -- new row is also owned by the user

DROP POLICY IF EXISTS "Users can delete their own notes." ON "public"."notes";
CREATE POLICY "Users can delete their own notes." ON "public"."notes" FOR DELETE 
TO authenticated
using (("user_id" = "auth"."uid"()));

-- reminders tables
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reminder_status') THEN
        CREATE TYPE reminder_status AS ENUM ('pending', 'completed', 'cancelled');
    END IF;
END
$$;

create table if not exists "public"."reminders" (
    "id" "uuid" not null primary key,
    "user_id" "uuid" not null,
    "message" "text",
    "status" "reminder_status" not null,
    "remind_at" timestamp with time zone,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);

alter table "public"."reminders" 
    drop constraint if exists "reminders_user_id_fkey",
    add constraint "reminders_user_id_fkey" foreign key ("user_id") references "auth"."users"("id") on delete cascade;

alter table "public"."reminders" enable row level security;

drop policy if exists "Users can see their own reminders." on "public"."reminders";
create policy "Users can see their own reminders." on "public"."reminders" for select
to authenticated
using (("user_id" = "auth"."uid"()));

drop policy if exists "Users can insert reminders." on "public"."reminders";
create policy "Users can insert reminders." on "public"."reminders" for insert
to authenticated
with check (("user_id" = "auth"."uid"()));

drop policy if exists "Users can update their own reminders." on "public"."reminders";
create policy "Users can update their own reminders." on "public"."reminders" for update
to authenticated
using (("user_id" = "auth"."uid"()))
with check (("user_id" = "auth"."uid"()));

drop policy if exists "Users can delete their own reminders." on "public"."reminders";
create policy "Users can delete their own reminders." on "public"."reminders" for delete
to authenticated
using (("user_id" = "auth"."uid"()));





