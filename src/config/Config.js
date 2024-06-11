import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mskgzkslahrdrqakhwao.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2d6a3NsYWhyZHJxYWtod2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4NTk0MjksImV4cCI6MjAzMjQzNTQyOX0.InCchX6t317WNHFdz5WaHONVm7WZS9XJZNngBGE0uuM";
export const supabase = createClient(supabaseUrl, supabaseKey);
