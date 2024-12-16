"use server";
import { createClient } from "@supabase/supabase-js";

const adminSupabaseClient = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_KEY!,
);

export default adminSupabaseClient;
