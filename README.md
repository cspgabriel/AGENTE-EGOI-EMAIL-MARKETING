# 🤖 AGENTE EGOI EMAIL MARKETING

Repositório estruturado para automação de e-mail marketing integrado com a **API v3 do E-goi** e inteligência artificial usando o **Google Gemini API**.

Este agente gera e-mails personalizados e persuasivos utilizando IA e os envia automaticamente utilizando a infraestrutura do E-goi.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Ambiente de execução JavaScript)
* **Axios** (Cliente HTTP para requisições diretas na API do E-goi)
* **egoisdk** (SDK oficial do E-goi no NPM)
* **@google/genai** (SDK do Gemini 2.5 Flash para geração de e-mails)
* **dotenv** (Gerenciamento seguro de variáveis de ambiente)

---

## 🔑 Credenciais e Segurança

As credenciais estão seguras e isoladas no arquivo `.env` para evitar vazamentos acidentais no GitHub.

No arquivo `.env` deste repositório, você encontrará a sua chave configurada:
* **E-goi API Key:** `645c4b75d6d8acafb7fd5f8b942453b9a3b01d18`
* **Gemini API Key:** Espaço reservado para você colar sua chave Gemini do Google AI Studio.

> [!WARNING]
> Nunca envie o arquivo `.env` para repositórios públicos no GitHub. Ele já está incluído no seu `.gitignore`.

---

## 📦 Como Instalar e Rodar

### 1. Instalar as dependências
Abra o terminal na pasta do projeto e execute:
```bash
npm install
```

### 2. Testar a conexão com o E-goi
Para validar se a chave da API está ativa e listar suas listas de contatos criadas no E-goi:
```bash
npm run test-conn
```

### 3. Rodar o Agente de E-mail por IA (Gemini + E-goi)
Antes de rodar, adicione sua `GEMINI_API_KEY` no arquivo `.env` e ajuste o `LIST_ID` e `SENDER_ID` reais dentro do arquivo `egoi-email-agent.js`. Em seguida, execute:
```bash
npm run send-agent
```

### 4. Rodar o cliente de teste usando o SDK oficial
```bash
npm run send-sdk
```

---

## 📘 Estrutura da API E-goi v3

### Criar uma campanha de e-mail
* **Método:** `POST`
* **URL:** `https://api.egoiapp.com/campaigns/email`
* **Headers:**
  ```json
  {
    "Apikey": "SUA_API_KEY",
    "Content-Type": "application/json"
  }
  ```
* **Corpo (Payload):**
  ```json
  {
    "title": "Minha Campanha IA",
    "list_id": 1,
    "sender_id": 1,
    "subject": "Assunto do E-mail",
    "html_body": "<html>...</html>"
  }
  ```

### Disparar a campanha
* **Método:** `POST`
* **URL:** `https://api.egoiapp.com/campaigns/email/{campaign_hash}/actions/send`

---

## 🔗 Referências Úteis

* 📖 **Documentação da API E-goi:** [E-goi API-Docs](https://api-docs.e-goi.com/)
* 💻 **SDKs Oficiais no GitHub:** [E-goi SDK Repos](https://github.com/e-goi?q=sdk)
* 🚀 **Plataforma Goidini:** [Goidini Login](https://goidini.e-goi.com/auth/login/token/f667e973960544dd92f6bd2d20685108/redirect_uri/index/home)
