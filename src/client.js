
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tnrkvhyahgvlvepjccvq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRucmt2aHlhaGd2bHZlcGpjY3ZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTgxMDcwNCwiZXhwIjoyMDY1Mzg2NzA0fQ.eJmU-RVlAkpDfVg6spAIhym-uG1tMcHCkNRtYm50nlU'
export const supabase = createClient(supabaseUrl, supabaseKey)
