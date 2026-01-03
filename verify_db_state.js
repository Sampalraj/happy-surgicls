import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser since dotenv might not be installed
function loadEnv() {
    try {
        const envPath = path.resolve(__dirname, '.env');
        if (!fs.existsSync(envPath)) return {};
        const content = fs.readFileSync(envPath, 'utf-8');
        return content.split('\n').reduce((acc, line) => {
            const [key, val] = line.split('=');
            if (key && val) acc[key.trim()] = val.trim();
            return acc;
        }, {});
    } catch (e) {
        console.error('Error loading .env:', e);
        return {};
    }
}

const env = loadEnv();
console.log('Loading .env from:', path.resolve(__dirname, '.env'));
console.log('Keys found:', Object.keys(env));

const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Could not find VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySchema() {
    console.log('--- Verifying Database Schema ---');

    // Check 1: 'code' column in products
    console.log('\n1. Checking "products" table for "code" column...');
    const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select('id, code') // Explicitly select 'code'
        .limit(1);

    if (prodError) {
        if (prodError.message.includes('Could not find the \'code\' column')) {
            console.error('FAIL: "code" column MISSING in "products" table.');
        } else {
            console.error('FAIL: Error accessing products:', prodError.message);
        }
    } else {
        console.log('PASS: "code" column exists.');
    }

    // Check 2: 'product_certificates' table
    console.log('\n2. Checking "product_certificates" table existence...');
    const { data: certData, error: certError } = await supabase
        .from('product_certificates')
        .select('*')
        .limit(1);

    if (certError) {
        if (certError.code === '42P01' || certError.message.includes('does not exist')) {
            console.error('FAIL: "product_certificates" table MISSING.');
        } else {
            console.error('FAIL: Error accessing product_certificates:', certError.message);
        }
    } else {
        console.log('PASS: "product_certificates" table exists.');
    }

    console.log('\n--- Verification Complete ---');
}

verifySchema();
