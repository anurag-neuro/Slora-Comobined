/// supabase-config.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = 'https://mukctnzjzeiszdexknyf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11a2N0bnpqemVpc3pkZXhrbnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMDU5NDMsImV4cCI6MjA2NDg4MTk0M30.T-uGYkebc7yBdoKLCDo3L-R1iRbSf9gkqBasV7lEKWU'; // Truncated for safety

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
