drop policy if exists "Users can insert their own user." on "public"."users";
create policy "Users can insert their own user." on "public"."users" for insert
to authenticated
with check (("id" = "auth"."uid"()));

drop policy if exists "Users can update their own user." on "public"."users";
create policy "Users can update their own user." on "public"."users" for update
to authenticated
using (("id" = "auth"."uid"()))
with check (("id" = "auth"."uid"()));