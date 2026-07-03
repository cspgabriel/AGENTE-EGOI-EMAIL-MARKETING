import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EGOI_API_KEY = process.env.EGOI_API_KEY;

if (!EGOI_API_KEY) {
  console.error('❌ EGOI_API_KEY não configurada.');
  process.exit(1);
}

const LIST_ID = 9;       // List: Teste MKT
const SENDER_ID = 2;     // Sender: HotéisRIO <marketing@hoteisrio.com.br>
const RECIPIENT_EMAIL = 'marketing@hoteisrio.com.br';

async function sendTestEmail() {
  const headers = {
    'Apikey': EGOI_API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    // Passo 1: Adicionar ou atualizar o contato na lista de teste
    console.log(`👤 Adicionando/atualizando contato: ${RECIPIENT_EMAIL} na lista ID ${LIST_ID}...`);
    try {
      await axios.post(`https://api.egoiapp.com/lists/${LIST_ID}/contacts`, {
        base: {
          email: RECIPIENT_EMAIL,
          status: 'active',
          first_name: 'Equipe Marketing'
        }
      }, { headers });
      console.log('✅ Contato cadastrado/atualizado na lista com sucesso.');
    } catch (contactError) {
      // Se o contato já existir, a API pode dar erro ou retornar sucesso. Vamos logar e continuar
      console.log('ℹ️ Contato já cadastrado ou erro ignorado no cadastro de contato:', contactError.response?.data || contactError.message);
    }

    // Passo 2: Criar a campanha de e-mail de teste
    console.log('📝 Criando campanha de e-mail de teste...');
    const campaignPayload = {
      internal_name: 'E-mail Teste - Agente E-goi',
      list_id: LIST_ID,
      sender_id: SENDER_ID,
      subject: 'E-mail de Teste do Agente de Automação',
      content: {
        type: 'html',
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background-color: #0d6efd; padding: 20px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 24px;">Testando Conexão E-goi</h1>
            </div>
            <div style="padding: 20px; color: #333; line-height: 1.6;">
              <p>Olá, Equipe de Marketing!</p>
              <p>Este é um e-mail de teste gerado e disparado automaticamente pelo seu <strong>Agente E-goi Email Marketing</strong> local.</p>
              <p>Se você recebeu esta mensagem, significa que a integração com a API v3 do E-goi e os remetentes estão funcionando perfeitamente!</p>
              <div style="background-color: #f8f9fa; border-left: 4px solid #0d6efd; padding: 15px; margin: 20px 0;">
                <strong>Status da Conexão:</strong> Ativa (API v3)<br/>
                <strong>Remetente Utilizado:</strong> marketing@hoteisrio.com.br
              </div>
              <p>Pronto para ativar as campanhas de automação com Inteligência Artificial!</p>
            </div>
            <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #666;">
              Este é um e-mail automatizado. Por favor, não responda diretamente.
            </div>
          </div>
        `
      }
    };

    const campaignRes = await axios.post('https://api.egoiapp.com/campaigns/email', campaignPayload, { headers });
    console.log('📦 Resposta da Criação de Campanha:', JSON.stringify(campaignRes.data, null, 2));
    const hash = campaignRes.data.campaign_hash || campaignRes.data.hash || campaignRes.data.campaignId;
    console.log(`✅ Campanha criada com sucesso! Hash: ${hash}`);

    // Passo 3: Enviar a campanha imediatamente
    console.log(`🚀 Disparando campanha com hash ${hash}...`);
    const sendPayload = {
      list_id: LIST_ID,
      segments: {
        type: 'contact',
        data: RECIPIENT_EMAIL
      }
    };
    const sendRes = await axios.post(`https://api.egoiapp.com/campaigns/email/${hash}/actions/send`, sendPayload, { headers });
    
    console.log('🎉 Envio efetuado com sucesso!');
    console.log(JSON.stringify(sendRes.data, null, 2));

  } catch (error) {
    console.error('❌ Falha ao processar envio do e-mail de teste:');
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

sendTestEmail();
