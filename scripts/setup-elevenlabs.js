#!/usr/bin/env node

/**
 * ElevenLabs ConvAI Setup Script
 * This script helps set up the ElevenLabs integration
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

console.log('🚀 ElevenLabs ConvAI Setup Script');
console.log('==================================\n');

// Generate secure tool secret
function generateToolSecret() {
  return crypto.randomBytes(32).toString('hex');
}

// Check if .env.local exists
function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    console.log('✅ .env.local file found');
    return true;
  } else {
    console.log('❌ .env.local file not found');
    return false;
  }
}

// Create .env.local template
function createEnvTemplate() {
  const toolSecret = generateToolSecret();
  
  const envTemplate = `# ElevenLabs ConvAI Integration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_TOOL_SECRET=${toolSecret}
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id_here

# Supabase Configuration (existing)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Existing variables (keep these)
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here
`;

  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envTemplate);
  
  console.log('✅ Created .env.local template');
  console.log(`🔑 Generated secure tool secret: ${toolSecret.substring(0, 8)}...`);
  return toolSecret;
}

// Validate environment variables
function validateEnvVars() {
  const requiredVars = [
    'ELEVENLABS_API_KEY',
    'ELEVENLABS_TOOL_SECRET',
    'NEXT_PUBLIC_ELEVENLABS_AGENT_ID',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  const missing = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    console.log('❌ Missing environment variables:');
    missing.forEach(varName => console.log(`   - ${varName}`));
    return false;
  }

  console.log('✅ All required environment variables are set');
  return true;
}

// Main setup function
async function setup() {
  console.log('1. Checking environment file...');
  const envExists = checkEnvFile();
  
  if (!envExists) {
    console.log('\n2. Creating .env.local template...');
    createEnvTemplate();
    console.log('\n📝 Please edit .env.local and add your actual API keys');
    console.log('   Then run this script again to validate the setup');
    return;
  }

  console.log('\n2. Loading environment variables...');
  require('dotenv').config({ path: '.env.local' });

  console.log('\n3. Validating environment variables...');
  const isValid = validateEnvVars();
  
  if (!isValid) {
    console.log('\n❌ Please fix the missing environment variables and run again');
    return;
  }

  console.log('\n4. Checking Supabase connection...');
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data, error } = await supabase
      .from('Order')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful');
    }
  } catch (error) {
    console.log('❌ Supabase connection failed:', error.message);
  }

  console.log('\n🎉 Setup completed successfully!');
  console.log('\n📋 Next Steps:');
  console.log('1. Configure your ElevenLabs agent in the dashboard');
  console.log('2. Set up the webhook tool with the provided secret');
  console.log('3. Test the integration: npm run test:elevenlabs');
  console.log('4. Visit /test-elevenlabs to test the widget');
  console.log('5. Deploy to production with HTTPS');
  
  console.log('\n🔧 Configuration Summary:');
  console.log(`   Tool Secret: ${process.env.ELEVENLABS_TOOL_SECRET.substring(0, 8)}...`);
  console.log(`   Agent ID: ${process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}`);
  console.log(`   Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
}

// Run setup
setup().catch(console.error);
