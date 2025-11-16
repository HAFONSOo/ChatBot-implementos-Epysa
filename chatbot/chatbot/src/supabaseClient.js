
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://iyjpcywewsbyhjkpctbc.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5anBjeXdld3NieWhqa3BjdGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NDMxMTQsImV4cCI6MjA3ODIxOTExNH0.c_XCzQNft1ZJCg6kpU1m5EaID0YV5dTq91RKlBrIz1o'
export const supabase = createClient(supabaseUrl, supabaseKey)