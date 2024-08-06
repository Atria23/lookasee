
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kgrkmrlsflixkyquhpvx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncmttcmxzZmxpeGt5cXVocHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3MzE1NTMsImV4cCI6MjAzNzMwNzU1M30.vKu_oyvJ1sZ2G4tJDthflzQD4wYclS6RGr5zCLJgqls'
export const supabase = createClient(supabaseUrl, supabaseKey)