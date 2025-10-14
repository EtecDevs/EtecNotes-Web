// Script para verificar usuários no Firebase Authentication
// Execute com: node verify-users.js

import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Carregar credenciais do admin
const serviceAccount = JSON.parse(
  readFileSync('./etecnotes-firebase-adminsdk.json', 'utf8')
);

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

async function verifyUser(email) {
  try {
    const user = await auth.getUserByEmail(email);
    console.log(`\n✅ Usuário ${email} existe!`);
    console.log(`   UID: ${user.uid}`);
    console.log(`   Email verificado: ${user.emailVerified}`);
    console.log(`   Desabilitado: ${user.disabled}`);
    console.log(`   Último login: ${user.metadata.lastSignInTime || 'Nunca'}`);
    return true;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.log(`\n❌ Usuário ${email} NÃO existe no Firebase Authentication`);
      console.log(`   💡 Você precisa criar este usuário primeiro!`);
      return false;
    }
    console.error(`\n❌ Erro ao verificar ${email}:`, error.message);
    return false;
  }
}

async function createUser(email, password, displayName) {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: displayName,
      emailVerified: true
    });
    console.log(`\n✅ Usuário ${email} criado com sucesso!`);
    console.log(`   UID: ${userRecord.uid}`);
    return userRecord;
  } catch (error) {
    console.error(`\n❌ Erro ao criar ${email}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🔍 Verificando usuários de teste no Firebase Authentication...\n');
  console.log('=' .repeat(60));

  const testUsers = [
    { email: 'aluno@teste.com', password: '123456', name: 'João Santos (Aluno)' },
    { email: 'professor@teste.com', password: '123456', name: 'Maria Silva (Professor)' },
    { email: 'admin@teste.com', password: '123456', name: 'Admin Master' },
    { email: 'dev@teste.com', password: '123456', name: 'Dev EtecNotes' },
  ];

  let missing = [];

  // Verificar todos os usuários
  for (const user of testUsers) {
    const exists = await verifyUser(user.email);
    if (!exists) {
      missing.push(user);
    }
  }

  // Criar usuários faltantes
  if (missing.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('🔧 Criando usuários faltantes...\n');
    
    for (const user of missing) {
      await createUser(user.email, user.password, user.name);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Verificação concluída!');
  
  if (missing.length > 0) {
    console.log('\n💡 Agora tente fazer login novamente no aplicativo.');
  } else {
    console.log('\n✅ Todos os usuários de teste existem no Firebase Authentication.');
    console.log('💡 Se ainda estiver tendo erros, verifique:');
    console.log('   1. Configuração do firebase.js está correta');
    console.log('   2. Credenciais (apiKey, authDomain, etc) estão corretas');
    console.log('   3. Não há bloqueios de firewall ou proxy');
  }
  
  process.exit(0);
}

main();
