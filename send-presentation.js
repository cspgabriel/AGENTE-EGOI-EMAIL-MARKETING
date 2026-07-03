import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EGOI_API_KEY = process.env.EGOI_API_KEY;

if (!EGOI_API_KEY) {
  console.error('❌ EGOI_API_KEY não configurada.');
  process.exit(1);
}

const LIST_ID = 9;       // List: Teste MKT
const SENDER_ID = 1;     // Sender: ABIH-RJ <abih-rj@abihrj.com.br>
const RECIPIENTS = [
  'marketing@sindhoteisrj.com.br',
  'cristiana@hoteisrio.com.br',
  'marketing@hoteisrio.com.br'
];

async function addContactsAndSendPresentation() {
  const headers = {
    'Apikey': EGOI_API_KEY,
    'Content-Type': 'application/json'
  };

  // 1. Cadastrar/atualizar todos os destinatários na lista
  console.log('👤 Cadastrando contatos na lista...');
  for (const email of RECIPIENTS) {
    try {
      await axios.post(`https://api.egoiapp.com/lists/${LIST_ID}/contacts`, {
        base: {
          email: email,
          status: 'active',
          first_name: email.split('@')[0]
        }
      }, { headers });
      console.log(`✅ Contato adicionado/atualizado: ${email}`);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        console.log(`ℹ️ Contato ${email} já existe na lista.`);
      } else {
        console.warn(`⚠️ Erro ao adicionar ${email}:`, err.response?.data || err.message);
      }
    }
  }

  // 2. HTML do E-mail de Apresentação
  const emailHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0f2b46 0%, #1a4a75 100%); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 26px; font-weight: 600; letter-spacing: 0.5px;">Agente E-goi Email Marketing</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Automação de E-mail de Alta Performance via IA & API v3</p>
      </div>

      <!-- Body Content -->
      <div style="padding: 30px; color: #333; line-height: 1.6;">
        <p style="font-size: 16px; margin-top: 0;">Olá, Equipe,</p>
        
        <p>Temos o prazer de apresentar o setup do **Agente de Automação de E-mail Marketing do E-goi**, integrado diretamente com inteligência artificial para otimização dos nossos fluxos de comunicação.</p>

        <!-- GitHub Repository Section -->
        <div style="background-color: #f4f7fa; border-left: 5px solid #0056b3; padding: 20px; border-radius: 4px; margin: 25px 0;">
          <h3 style="margin-top: 0; color: #0f2b46; font-size: 16px;">📁 Repositório de Integração (GitHub)</h3>
          <p style="margin: 5px 0 10px 0; font-size: 14px;">O código-fonte de integração, scripts de teste e documentação de uso do SDK foram consolidados no repositório:</p>
          <a href="https://github.com/cspgabriel/AGENTE-EGOI-EMAIL-MARKETING" style="display: inline-block; background-color: #0f2b46; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; font-size: 14px;" target="_blank">Acessar Repositório GitHub</a>
          <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">*Nota: O repositório está configurado e pode ser mantido privado para segurança das chaves.*</p>
        </div>

        <!-- Credentials Section -->
        <h3 style="color: #1a4a75; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 8px;">🔑 Configuração de Credenciais</h3>
        <p>As chaves estão parametrizadas localmente no arquivo '.env' para garantir a segurança dos dados:</p>
        <ul style="padding-left: 20px;">
          <li><strong>E-goi API Key:</strong> <code style="background-color: #f1f1f1; padding: 2px 6px; border-radius: 3px; font-family: monospace;">645c4...01d18</code></li>
          <li><strong>Remetente Homologado:</strong> <code style="background-color: #f1f1f1; padding: 2px 6px; border-radius: 3px; font-family: monospace;">abih-rj@abihrj.com.br</code> (ID 1)</li>
          <li><strong>Domínio de Envio / CNAME:</strong> <code style="background-color: #f1f1f1; padding: 2px 6px; border-radius: 3px; font-family: monospace;">emailmkt.abihrj.com.br</code></li>
        </ul>

        <!-- API Features Section -->
        <h3 style="color: #1a4a75; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 8px;">🚀 Recursos & Funções da API E-goi v3</h3>
        <p>A nova API v3 do E-goi nos concede controle total e direto sobre:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 14px;">Recurso</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 14px;">Função e Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;"><strong>Gestão de Contatos</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">Cadastro individual ou em massa (bulk-import) de leads nas listas.</td>
            </tr>
            <tr style="background-color: #fcfcfc;">
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;"><strong>Campanhas</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">Criação e edição de e-mails em HTML dinâmico direto via código.</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;"><strong>Disparos Diretos</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">Agendamento ou disparo em tempo real para toda a lista ou contatos específicos.</td>
            </tr>
            <tr style="background-color: #fcfcfc;">
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;"><strong>Relatórios de Envios</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">Aberturas, cliques e bounces integráveis por Webhooks com nossos painéis.</td>
            </tr>
          </tbody>
        </table>

        <!-- IA Prompt Box -->
        <h3 style="color: #1a4a75; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 8px;">🤖 Como a IA atua nos disparos</h3>
        <p>Abaixo está o prompt estruturado que você pode colar no seu assistente local (ChatGPT/Claude/Gemini) para gerar novos envios automáticos:</p>
        <div style="background-color: #272822; color: #f8f8f2; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; margin: 15px 0;">
"Gere um e-mail de marketing profissional em formato HTML para a lista do E-goi. O tema será [TEMA_AQUI], focado em [PUBLICO-ALVO]. Retorne apenas o código HTML limpo dentro de um objeto JSON estruturado para o script do Agente."
        </div>

        <p style="margin-top: 25px;">O sistema está pronto para produção e homologado para os domínios do ABIH-RJ e HotéisRIO.</p>

        <p style="margin-bottom: 0;">Atenciosamente,<br/><strong>Agente de Automação de Marketing</strong></p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f8f9fa; border-top: 1px solid #e0e0e0; padding: 20px; text-align: center; font-size: 12px; color: #777;">
        Enviado automaticamente via E-goi API v3 integrado com IA.<br/>
        © 2026 Associação de Hotéis do Rio de Janeiro.
      </div>
    </div>
  `;

  // 3. Criar a campanha de apresentação
  console.log('📝 Criando campanha de e-mail de apresentação...');
  const campaignPayload = {
    internal_name: 'Apresentacao Agente E-goi API v3',
    list_id: LIST_ID,
    sender_id: SENDER_ID,
    subject: 'Apresentação: Agente E-goi Email Marketing & API v3',
    content: {
      type: 'html',
      body: emailHtml
    }
  };

  try {
    const campaignRes = await axios.post('https://api.egoiapp.com/campaigns/email', campaignPayload, { headers });
    const hash = campaignRes.data.campaign_hash;
    console.log(`✅ Campanha criada! Hash: ${hash}`);

    // 4. Disparar a campanha para toda a lista de teste (que contém os 3 contatos configurados)
    console.log('🚀 Disparando para todos os destinatários...');
    const sendPayload = {
      list_id: LIST_ID,
      segments: {
        type: 'none' // Envia para toda a lista selecionada
      }
    };

    const sendRes = await axios.post(`https://api.egoiapp.com/campaigns/email/${hash}/actions/send`, sendPayload, { headers });
    console.log('🎉 Campanha disparada com sucesso!');
    console.log(JSON.stringify(sendRes.data, null, 2));

  } catch (error) {
    console.error('❌ Falha ao processar envio de apresentação:');
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

addContactsAndSendPresentation();
