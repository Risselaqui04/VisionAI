import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gxkhgdzqclqqiazuapnu.supabase.co";
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4a2hnZHpxY2xxcWlhenVhcG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDEyOTIsImV4cCI6MjA5NzY3NzI5Mn0.Mvcva9GEKFhyETHnRezFYQ162fTU_PFfHRCEL_nczxw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
