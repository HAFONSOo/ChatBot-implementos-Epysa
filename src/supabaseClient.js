
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ftwhfyigfxmdtexdoapb.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0d2hmeWlnZnhtZHRleGRvYXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjE2MjMsImV4cCI6MjA3NzU5NzYyM30.-i7niYbn5z8p8VmNcYaEgLrLlhOGJ8q6A4fA22Gbs8M'
export const supabase = createClient(supabaseUrl, supabaseKey)