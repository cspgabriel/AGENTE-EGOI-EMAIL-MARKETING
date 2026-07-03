import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EGOI_API_KEY = process.env.EGOI_API_KEY;

if (!EGOI_API_KEY) {
  console.error('❌ Chave EGOI_API_KEY não configurada no arquivo .env.');
  process.exit(1);
}

async function testConnection() {
  console.log('📡 Conectando ao E-goi API v3...');
  try {
    const response = await axios.get('https://api.egoiapp.com/lists', {
      headers: {
        'Apikey': EGOI_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Conexão estabelecida com sucesso!');
    console.log('📋 Suas Listas de Contatos no E-goi:');
    
    if (response.data.items && response.data.items.length > 0) {
      response.data.items.forEach(list => {
        console.log(`- [ID: ${list.list_id}] ${list.title} (Contatos: ${list.internal_name || 'N/A'})`);
      });
    } else {
      console.log('Nenhuma lista de contatos encontrada.');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com E-goi:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Detalhes:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testConnection();
