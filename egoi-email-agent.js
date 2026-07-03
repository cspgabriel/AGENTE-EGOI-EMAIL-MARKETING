import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EGOI_API_KEY = process.env.EGOI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!EGOI_API_KEY) {
  console.error('❌ Chave EGOI_API_KEY não configurada no arquivo .env.');
  process.exit(1);
}

// Inicializa a IA se a chave do Gemini estiver configurada
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

/**
 * Gera o corpo do e-mail em HTML usando o Gemini (IA)
 */
async function gerarConteudoEmail(nomeCliente, tema) {
  if (!ai) {
    console.log('⚠️ GEMINI_API_KEY não configurada. Usando template padrão de fallback...');
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Olá, ${nomeCliente}!</h2>
        <p>Este é um e-mail automático enviado pelo seu Agente E-goi.</p>
        <p>Tema abordado: <strong>${tema}</strong></p>
        <hr/>
        <p>Atenciosamente,<br/>Sua Equipe</p>
      </div>
    `;
  }

  console.log(`🤖 Solicitando ao Gemini para gerar e-mail sobre: "${tema}"...`);
  const prompt = `
    Escreva um e-mail profissional e persuasivo de marketing em HTML para o cliente chamado "${nomeCliente}".
    O tema principal do e-mail é: "${tema}".
    Utilize boas práticas de design (responsivo, padding limpo, fontes legíveis).
    Retorne APENAS o código HTML limpo, sem explicações adicionais, sem formatações de bloco markdown como \`\`\`html ou \`\`\`.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error('❌ Erro ao gerar conteúdo com Gemini:', error.message);
    throw error;
  }
}

/**
 * Cria e envia uma campanha de e-mail marketing pelo E-goi v3
 * 
 * @param {string} email - Email do destinatário
 * @param {string} nome - Nome do destinatário
 * @param {string} assunto - Assunto do e-mail
 * @param {string} htmlContent - Conteúdo HTML
 * @param {number} listId - ID da lista de contatos do E-goi
 * @param {number} senderId - ID do remetente autenticado no E-goi
 */
async function dispararCampanhaEgoi(email, nome, assunto, htmlContent, listId, senderId) {
  try {
    console.log('📝 Criando campanha de e-mail no E-goi...');
    
    // Passo 1: Criar a campanha
    const createCampaignUrl = 'https://api.egoiapp.com/campaigns/email';
    const campaignPayload = {
      title: `Campanha IA: ${assunto.substring(0, 30)}`,
      list_id: listId,
      sender_id: senderId,
      subject: assunto,
      html_body: htmlContent,
      // Você pode adicionar mais opções como preheader, name, etc.
    };

    const campaignResponse = await axios.post(createCampaignUrl, campaignPayload, {
      headers: {
        'Apikey': EGOI_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const hash = campaignResponse.data.hash;
    console.log(`✅ Campanha criada com sucesso! Hash: ${hash}`);

    // Passo 2: Enviar a campanha imediatamente
    console.log(`🚀 Iniciando o disparo da campanha ${hash}...`);
    const sendUrl = `https://api.egoiapp.com/campaigns/email/${hash}/actions/send`;
    
    const sendPayload = {
      // Deixar em branco dispara para toda a lista selecionada na campanha
      // Ou você pode segmentar
    };

    const sendResponse = await axios.post(sendUrl, sendPayload, {
      headers: {
        'Apikey': EGOI_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('🎉 Disparo ordenado com sucesso!', sendResponse.data);
    return sendResponse.data;

  } catch (error) {
    console.error('❌ Erro no fluxo E-goi:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Detalhes:', error.response.data);
    } else {
      console.error(error.message);
    }
    throw error;
  }
}

// Exemplo de execução
async function executarAgente() {
  const destinatarioNome = 'Gabriel';
  const destinatarioEmail = 'exemplo@cliente.com';
  const tema = 'Convite para conhecer o novo portal de demandas públicas do Rio de Janeiro';
  const assunto = 'Novidades exclusivas sobre a Ordem Pública no Rio';
  
  // IMPORTANTE: Insira seus IDs reais do E-goi aqui (você pode ver o ID da lista rodando "npm run test-conn")
  const LIST_ID = 1;      // Substitua pelo ID real da sua lista
  const SENDER_ID = 1;    // Substitua pelo ID do seu remetente verificado
  
  try {
    const htmlBody = await gerarConteudoEmail(destinatarioNome, tema);
    console.log('\n--- CONTEÚDO HTML GERADO ---');
    console.log(htmlBody.substring(0, 300) + '...\n----------------------------');

    // Descomente a linha abaixo para disparar de verdade se você já configurou o LIST_ID e SENDER_ID corretos:
    // await dispararCampanhaEgoi(destinatarioEmail, destinatarioNome, assunto, htmlBody, LIST_ID, SENDER_ID);
    
    console.log('💡 Para realizar o envio real, abra o arquivo "egoi-email-agent.js" e configure o LIST_ID e SENDER_ID reais.');
  } catch (err) {
    console.error('Falha na execução do Agente:', err.message);
  }
}

executarAgente();
