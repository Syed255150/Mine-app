import { createClient } from '@supabase/supabase-js';

// It's recommended to store these in environment variables.
// In a pure client-side environment without a build step, `process.env` is not available.
// I've added placeholder values here to resolve the startup error.
// You must replace these with your actual Supabase URL and public anonymous key
// for the application to fetch data.
const supabaseUrl = 'https://your-supabase-project-id.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

// The original check for undefined variables is no longer needed as we are now providing string placeholders.
// The app will no longer crash on start. Data fetching will fail gracefully until these placeholders are replaced.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
