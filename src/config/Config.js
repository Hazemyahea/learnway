import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mskgzkslahrdrqakhwao.supabase.co";
console.log(supabaseUrl);
const supabaseKey = import.meta.env.VITE_API_KEY;
console.log(supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
