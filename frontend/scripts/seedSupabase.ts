import { createClient } from '@supabase/supabase-js';
import { demoReels } from '../src/data/demoReels';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Starting Supabase Seeding...');

  // The fields in demoReels match the Supabase table exactly, except for id which is auto-generated
  const { data, error } = await supabase
    .from('reels')
    .upsert(demoReels, { onConflict: 'reel_id' }); // Use upsert to avoid duplicate errors on rerun

  if (error) {
    console.error('Error inserting reels:', error.message, error.details, error.hint);
  } else {
    console.log('Successfully inserted / upserted', demoReels.length, 'reels into the database.');
  }
}

seed().catch(console.error);
