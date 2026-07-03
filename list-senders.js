import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EGOI_API_KEY = process.env.EGOI_API_KEY;

async function listSenders() {
  try {
    console.log('📡 Buscando remetentes cadastrados no E-goi...');
    const response = await axios.get('https://api.egoiapp.com/senders/email', {
      headers: {
        'Apikey': EGOI_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('📋 Remetentes de E-mail Encontrados:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Erro ao buscar remetentes:');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

listSenders();
