const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZW1hc2x4enlwcm1ranliaXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxNjU0NTYsImV4cCI6MjAyNzc0MTQ1Nn0.rwdf8dNEXxbC-GD6EnBkrBhS6etInFuLuUm3uTWZWrI'

const PROJECT_URL = 'https://lremaslxzyprmkjybitm.supabase.co'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(PROJECT_URL, API_KEY)
