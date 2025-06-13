
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tnrkvhyahgvlvepjccvq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucmt2aHlhaGd2bHZlcGpjY3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MTA3MDQsImV4cCI6MjA2NTM4NjcwNH0.iKM_YYDpgNqnUMNrhGa56BkGSs23LwyPe1w1AS9FAIQ'
export const supabase = createClient(supabaseUrl, supabaseKey)
