import { createClient } from '@supabase/supabase-js'

const URL = 'https://ljetxnntkmulbvnpwmrc.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqZXR4bm50a211bGJ2bnB3bXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4OTQ0MDgsImV4cCI6MjA0NzQ3MDQwOH0.2EJ00e0M3OQnRVsQhbvkf2icf1J1XYj1bUu7IsmtM2k';

export const supabase = createClient(URL, API_KEY);