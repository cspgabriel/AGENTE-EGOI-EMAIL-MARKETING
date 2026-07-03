import egoisdk from 'egoisdk';
import dotenv from 'dotenv';

dotenv.config();

const EGOI_API_KEY = process.env.EGOI_API_KEY;

if (!EGOI_API_KEY) {
  console.error('❌ Chave EGOI_API_KEY não configurada no arquivo .env.');
  process.exit(1);
}

// 1. Configurar o Cliente de API do E-goi SDK
const defaultClient = egoisdk.ApiClient.instance;

// Configurar Autenticação por chave de API (Apikey)
const Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = EGOI_API_KEY;

console.log('🔌 E-goi SDK Inicializado com sucesso.');

// Exemplo de como usar o SDK para buscar informações das listas
async function buscarListasComSDK() {
  // O SDK possui classes geradas para cada grupo de endpoints (ex: ListsApi, CampaignsApi, etc.)
  const listsApi = new egoisdk.ListsApi();

  console.log('📡 Buscando listas usando o E-goi SDK...');
  
  listsApi.listsGet({}, (error, data, response) => {
    if (error) {
      console.error('❌ Erro no SDK ao buscar listas:', error);
    } else {
      console.log('✅ Listas encontradas via SDK:');
      if (data.items && data.items.length > 0) {
        data.items.forEach(list => {
          console.log(`- [ID: ${list.list_id}] ${list.title}`);
        });
      } else {
        console.log('Nenhuma lista de contatos cadastrada.');
      }
    }
  });
}

// Executar exemplo do SDK
buscarListasComSDK();
