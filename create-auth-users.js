/**
 * Script para criar usuários no Firebase Authentication
 * Cria 4 usuários de teste: aluno, professor, admin e dev
 */

import admin from 'firebase-admin';

// Inicializar Firebase Admin SDK
// INSTRUÇÕES:
// 1. Vá para: https://console.firebase.google.com/project/etecnotes/settings/serviceaccounts/adminsdk
// 2. Clique em "Gerar nova chave privada"
// 3. Salve o arquivo JSON na raiz do projeto com o nome: etecnotes-firebase-adminsdk.json
// 4. Execute novamente: node create-auth-users.js

// Tentar carregar as credenciais
let serviceAccount;
try {
  // Método 1: Arquivo local
  const { readFileSync } = await import('fs');
  serviceAccount = JSON.parse(
    readFileSync('./etecnotes-firebase-adminsdk.json', 'utf8')
  );
} catch (error) {
  console.error('\n❌ Arquivo de credenciais não encontrado!\n');
  console.log('📋 PASSO A PASSO PARA GERAR O ARQUIVO:');
  console.log('1. Acesse: https://console.firebase.google.com/project/etecnotes/settings/serviceaccounts/adminsdk');
  console.log('2. Clique em "Gerar nova chave privada"');
  console.log('3. Salve o arquivo JSON baixado como: etecnotes-firebase-adminsdk.json');
  console.log('4. Coloque na raiz do projeto (mesma pasta do package.json)');
  console.log('5. Execute novamente: node create-auth-users.js\n');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

// Definir os 4 usuários a serem criados
const users = [
  {
    email: 'aluno@teste.com',
    password: '123456',
    displayName: 'João Santos (Aluno)',
    role: 'aluno',
    nome: 'João Santos',
    rm: '00001',
    curso: 'Desenvolvimento de Sistemas',
    etec: 'Etec de São Paulo'
  },
  {
    email: 'professor@teste.com',
    password: '123456',
    displayName: 'Maria Silva (Professor)',
    role: 'professor',
    nome: 'Maria Silva',
    disciplinas: ['Desenvolvimento Web', 'Programação Mobile', 'Banco de Dados'],
    etec: 'Etec de São Paulo'
  },
  {
    email: 'admin@teste.com',
    password: '123456',
    displayName: 'Admin Master',
    role: 'admin',
    nome: 'Admin Master',
    permissoes: ['all'],
    etec: 'Etec de São Paulo'
  },
  {
    email: 'dev@teste.com',
    password: '123456',
    displayName: 'Dev EtecNotes',
    role: 'dev',
    nome: 'Dev EtecNotes',
    permissoes: ['all', 'debug', 'logs'],
    etec: 'Etec de São Paulo'
  }
];

async function createUser(userData) {
  try {
    console.log(`\n🔄 Criando usuário: ${userData.email}...`);

    // Verificar se o usuário já existe
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(userData.email);
      console.log(`⚠️  Usuário ${userData.email} já existe!`);
      console.log(`   UID: ${userRecord.uid}`);
      
      // Atualizar a senha
      await auth.updateUser(userRecord.uid, {
        password: userData.password,
        displayName: userData.displayName
      });
      console.log(`✅ Senha atualizada para: ${userData.password}`);
      
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Criar novo usuário
        userRecord = await auth.createUser({
          email: userData.email,
          password: userData.password,
          displayName: userData.displayName,
          emailVerified: true
        });
        console.log(`✅ Usuário criado com sucesso!`);
        console.log(`   UID: ${userRecord.uid}`);
      } else {
        throw error;
      }
    }

    // Criar/atualizar documento no Firestore
    const userDocData = {
      email: userData.email,
      nome: userData.nome,
      displayName: userData.displayName,
      role: userData.role,
      active: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      etec: userData.etec
    };

    // Adicionar campos específicos por tipo
    if (userData.role === 'aluno') {
      userDocData.rm = userData.rm;
      userDocData.curso = userData.curso;
    } else if (userData.role === 'professor') {
      userDocData.disciplinas = userData.disciplinas;
    } else if (userData.role === 'admin' || userData.role === 'dev') {
      userDocData.permissoes = userData.permissoes;
    }

    // Salvar no Firestore
    await db.collection('users').doc(userRecord.uid).set(userDocData, { merge: true });
    console.log(`✅ Documento Firestore criado/atualizado`);

    return {
      success: true,
      uid: userRecord.uid,
      email: userData.email,
      role: userData.role
    };

  } catch (error) {
    console.error(`❌ Erro ao criar ${userData.email}:`, error.message);
    return {
      success: false,
      email: userData.email,
      error: error.message
    };
  }
}

async function main() {
  console.log('🔥 Firebase Authentication - Criação de Usuários');
  console.log('================================================\n');
  console.log('📋 Usuários a serem criados:');
  users.forEach(u => console.log(`   - ${u.email} (${u.role})`));
  console.log('\n');

  const results = [];

  for (const userData of users) {
    const result = await createUser(userData);
    results.push(result);
  }

  // Resumo final
  console.log('\n\n📊 RESUMO FINAL');
  console.log('================================================');
  
  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n✅ Sucessos: ${success}/${users.length}`);
  console.log(`❌ Falhas: ${failed}/${users.length}\n`);

  if (success > 0) {
    console.log('🎉 Usuários criados/atualizados:');
    results
      .filter(r => r.success)
      .forEach(r => {
        console.log(`   ✓ ${r.email}`);
        console.log(`     UID: ${r.uid}`);
        console.log(`     Role: ${r.role}`);
        console.log(`     Senha: 123456\n`);
      });
  }

  if (failed > 0) {
    console.log('❌ Falhas:');
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`   ✗ ${r.email}: ${r.error}`);
      });
  }

  console.log('\n================================================');
  console.log('🔑 CREDENCIAIS DE LOGIN:');
  console.log('================================================\n');
  console.log('1️⃣  ALUNO');
  console.log('   Email: aluno@teste.com');
  console.log('   Senha: 123456');
  console.log('   Role: aluno\n');
  
  console.log('2️⃣  PROFESSOR');
  console.log('   Email: professor@teste.com');
  console.log('   Senha: 123456');
  console.log('   Role: professor\n');
  
  console.log('3️⃣  ADMIN');
  console.log('   Email: admin@teste.com');
  console.log('   Senha: 123456');
  console.log('   Role: admin\n');
  
  console.log('4️⃣  DEV');
  console.log('   Email: dev@teste.com');
  console.log('   Senha: 123456');
  console.log('   Role: dev\n');

  console.log('================================================');
  console.log('✅ Processo concluído!\n');

  process.exit(0);
}

main().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
