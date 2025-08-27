const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 ElevenLabs Integration Environment Setup\n');

console.log('This script will help you set up your environment variables.');
console.log('You will need your ElevenLabs and Supabase credentials.\n');

console.log('📋 Required Information:');
console.log('1. ElevenLabs API Key (from https://elevenlabs.io/profile/api-key)');
console.log('2. ElevenLabs Agent ID (from your Conversational AI agent)');
console.log('3. ElevenLabs Tool Secret (from your agent configuration)');
console.log('4. Supabase Project URL (from https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/settings/api)');
console.log('5. Supabase Anon Key (from the same page)');
console.log('6. Supabase Service Role Key (from the same page)\n');

console.log('⚠️  Make sure you have all these values ready before continuing.\n');

rl.question('Do you have all the required credentials? (y/n): ', (answer) => {
  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    console.log('\n❌ Please get your credentials first and then run this script again.');
    console.log('See ELEVENLABS_SETUP_GUIDE.md for detailed instructions.');
    rl.close();
    return;
  }

  console.log('\nGreat! Let\'s set up your environment variables.\n');

  const questions = [
    { key: 'ELEVENLABS_API_KEY', name: 'ElevenLabs API Key' },
    { key: 'ELEVENLABS_TOOL_SECRET', name: 'ElevenLabs Tool Secret' },
    { key: 'NEXT_PUBLIC_ELEVENLABS_AGENT_ID', name: 'ElevenLabs Agent ID' },
    { key: 'NEXT_PUBLIC_SUPABASE_URL', name: 'Supabase Project URL' },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', name: 'Supabase Anon Key' },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', name: 'Supabase Service Role Key' }
  ];

  const envVars = {};

  function askQuestion(index) {
    if (index >= questions.length) {
      // All questions answered, write the file
      writeEnvFile(envVars);
      return;
    }

    const question = questions[index];
    rl.question(`${question.name}: `, (value) => {
      if (value.trim()) {
        envVars[question.key] = value.trim();
      }
      askQuestion(index + 1);
    });
  }

  askQuestion(0);
});

function writeEnvFile(envVars) {
  let envContent = `# ElevenLabs Configuration
# Get these from your ElevenLabs dashboard: https://elevenlabs.io/
ELEVENLABS_API_KEY=${envVars.ELEVENLABS_API_KEY || 'your_elevenlabs_api_key_here'}
ELEVENLABS_TOOL_SECRET=${envVars.ELEVENLABS_TOOL_SECRET || 'your_elevenlabs_tool_secret_here'}
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=${envVars.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'your_elevenlabs_agent_id_here'}

# Supabase Configuration
# Get these from your Supabase project settings: https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/settings/api
NEXT_PUBLIC_SUPABASE_URL=${envVars.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co'}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here'}
SUPABASE_SERVICE_ROLE_KEY=${envVars.SUPABASE_SERVICE_ROLE_KEY || 'your_supabase_service_role_key_here'}

# Optional: Google Analytics (if you have it)
# NEXT_PUBLIC_GA_ID=your_google_analytics_id_here
`;

  try {
    fs.writeFileSync('.env.local', envContent);
    console.log('\n✅ Environment file created successfully!');
    console.log('📁 File: .env.local');
    console.log('\n🔒 Security Note: This file contains sensitive information.');
    console.log('   Make sure it\'s in your .gitignore and never commit it to version control.\n');
    
    console.log('🧪 Now you can test the integration:');
    console.log('   npm run test:elevenlabs\n');
    
    console.log('🚀 To start the development server:');
    console.log('   npm run dev\n');
    
    console.log('📖 For more information, see:');
    console.log('   - ELEVENLABS_SETUP_GUIDE.md');
    console.log('   - ELEVENLABS_INTEGRATION.md');
    
  } catch (error) {
    console.error('\n❌ Error creating environment file:', error.message);
  }

  rl.close();
}
