import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const secret = process.env.NEXT_PUBLIC_SUPABASE_SECRET!;

if (!url || !secret) throw new Error("Missing supabase credentials");

export const supabase = createClient(url, secret);
