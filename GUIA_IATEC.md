# 🤖 IAtec - Guia de Uso

## ✅ Implementação Completa!

A assistente virtual **IAtec** foi integrada ao EtecNotes com todos os recursos solicitados usando a **API do Google Gemini**.

---

## 🎯 Recursos Implementados

### 1. 💬 **Envio de Texto**
- Chat interativo com respostas em tempo real
- Contexto fixo sobre a Etec de Peruíbe
- Informações sobre eventos (Feira Tec, TCC, etc.)
- Sugestões rápidas de perguntas

### 2. 🎤 **Reconhecimento de Voz**
- Botão de microfone com feedback visual
- Reconhecimento em português (pt-BR)
- Envio automático após transcrição
- Compatível com Chrome e Edge

### 3. 🖼️ **Análise de Imagens**
- Upload de imagens com preview
- Conversão automática para Base64
- Análise inteligente da imagem junto com texto
- Suporte para JPEG, PNG, GIF, WebP

### 4. ⚙️ **Campo de Contexto Personalizado**
- Modal dedicado para alimentar a IA
- Contexto persistente durante a sessão
- Concatenado automaticamente com perguntas
- Ideal para informações específicas da turma

### 5. ⚠️ **Tratamento de Erros**
- Mensagens amigáveis de erro
- Logs detalhados no console
- Validação de permissões
- Feedback visual de problemas

---

## 🚀 Como Usar

### **1. Acesse a Página**
1. Faça login no EtecNotes
2. Navegue até a página **"Cloud"**
3. Clique na aba **"IATEC AI"**

### **2. Enviar Mensagem de Texto**
1. Digite sua pergunta no campo de input
2. Clique em **Enviar** ou pressione **Enter**
3. Aguarde a resposta da IAtec

**Exemplos de perguntas:**
- "Quais cursos técnicos estão disponíveis?"
- "Quando é a Feira Tecnológica?"
- "Horário de funcionamento da secretaria"

### **3. Usar Reconhecimento de Voz** 🎤
1. Clique no botão do **microfone**
2. Fale claramente sua pergunta
3. Aguarde a transcrição automática
4. A mensagem será enviada automaticamente

**Dica:** Funciona melhor no Google Chrome!

### **4. Enviar Imagem** 🖼️
1. Clique no botão de **imagem**
2. Selecione uma foto do seu computador
3. Digite uma pergunta sobre a imagem (opcional)
4. Clique em **Enviar**

**Exemplos de uso:**
- Foto de exercício: "Como resolver esta questão?"
- Foto de planta: "Que tipo de planta é essa?"
- Foto de código: "Explique este código"

### **5. Configurar Contexto** ⚙️
1. Clique no botão de **engrenagem** (⚙️)
2. Digite informações relevantes no campo de texto
3. Clique em **Salvar**

**Exemplos de contexto:**
```
- Professor de biologia pediu resumo sobre genética
- Prova de física na sexta-feira sobre termodinâmica
- Reunião de pais dia 22 de outubro
- Prazo de entrega do TCC: 15 de novembro
- Feira Tecnológica: preciso apresentar projeto sobre IA
```

---

## 🎨 Interface

### Botões Disponíveis:

| Botão | Função | Atalho |
|-------|--------|--------|
| ⚙️ | Configurar contexto | - |
| 🗑️ | Limpar conversa | - |
| 🎤 | Reconhecimento de voz | - |
| 🖼️ | Upload de imagem | - |
| ➤ | Enviar mensagem | Enter |

### Cores do Tema:

- **Principal:** `#8C43FF` (Roxo)
- **Secundária:** `#5b38ba` (Roxo escuro)
- **Destaque:** `#f3e8ff` (Roxo claro)

---

## 📋 Informações Fixas da IAtec

A IAtec já possui estas informações pré-configuradas:

```
ETEC DE PERUÍBE:
- Horário: 7h às 22h
- Secretaria fecha aos domingos
- Aulas: Segunda a sexta-feira

PRÓXIMOS EVENTOS:
- Feira Tecnológica: 20 de outubro de 2025
- Entrega de notas: 28 de outubro de 2025
- Semana do TCC: 4 a 8 de novembro de 2025
```

---

## 🔑 Configuração Técnica

### API Key Gemini:
```javascript
const API_KEY = "AIzaSyCF2Fbxlumv1qC3PRH1oMsS0tM8jKctabM"
```

### Modelo Utilizado:
- **gemini-1.5-flash** (rápido e econômico)

### Limites Gratuitos:
- 15 requisições por minuto
- 1,500 requisições por dia
- 1 milhão de tokens por minuto

---

## ⚠️ Solução de Problemas

### ❌ "Erro ao conectar com o IAtec 😢"

**Possíveis causas:**
1. Sem conexão com internet
2. API Key inválida ou expirada
3. Limite de requisições excedido

**Soluções:**
1. Verifique sua conexão Wi-Fi
2. Aguarde 1 minuto antes de tentar novamente
3. Abra o Console (F12) para ver detalhes do erro

### ❌ Voz não funciona

**Solução:**
1. Use Google Chrome ou Microsoft Edge
2. Permita acesso ao microfone quando solicitado
3. Verifique configurações de privacidade do navegador

### ❌ Imagem não é enviada

**Solução:**
1. Use formatos comuns (JPEG, PNG)
2. Reduza o tamanho da imagem (máx. 4MB recomendado)
3. Verifique se o arquivo não está corrompido

---

## 💡 Dicas de Uso

### **Para melhores resultados:**

✅ **Faça perguntas claras e específicas**
```
❌ "Me ajuda"
✅ "Como funciona o processo de matrícula na Etec?"
```

✅ **Use o contexto para informações permanentes**
```
Configure uma vez no início:
"Estou no 2º ano do curso de Informática"
"Tenho prova de matemática toda sexta-feira"
```

✅ **Combine texto com imagens**
```
Envie foto de exercício + "Explique passo a passo"
```

---

## 🎓 Exemplos Práticos

### **Situação 1: Dúvida sobre Matrícula**
```
Você: "Como faço para renovar minha matrícula?"
IAtec: "Para renovar a matrícula na Etec de Peruíbe..."
```

### **Situação 2: Ajuda com Estudos**
```
1. Configure contexto: "Prova de biologia sobre células amanhã"
2. Pergunte: "Me dê um resumo para estudar"
3. IAtec responderá focado em células!
```

### **Situação 3: Análise de Imagem**
```
1. Envie foto de exercício de física
2. Digite: "Como resolver esta questão?"
3. IAtec analisará a imagem e explicará passo a passo
```

---

## 🔒 Segurança

### ⚠️ **IMPORTANTE:**

A API Key está exposta no código frontend. Para uso em produção:

1. **Restrinja a chave no Google Cloud Console:**
   - Acesse: https://console.cloud.google.com/apis/credentials
   - Configure restrições de domínio
   - Defina limite de requisições

2. **Ou crie um backend proxy:**
   - Esconda a chave no servidor
   - Frontend chama seu próprio endpoint
   - Servidor chama o Gemini

---

## 📊 Monitoramento

### **Verificar uso da API:**

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Vá em **APIs & Services** → **Dashboard**
3. Selecione **Generative Language API**
4. Veja gráficos de uso e métricas

---

## 🎉 Recursos Extras

### **Mensagens Salvas:**
- Histórico completo durante a sessão
- Botão de copiar mensagens
- Timestamps em todas as mensagens

### **Interface Adaptativa:**
- Tema escuro/claro automático
- Responsivo (funciona em mobile)
- Animações suaves

### **Feedback Visual:**
- Indicador de "pensando..."
- Animação de pulsação ao gravar voz
- Preview de imagens antes de enviar

---

## 📞 Suporte

Para problemas técnicos:
1. Verifique o Console do navegador (F12)
2. Anote a mensagem de erro completa
3. Entre em contato com a equipe EtecDevs

---

**Desenvolvido por:** Equipe EtecDevs  
**Versão:** 1.0.0  
**Data:** Outubro 2025

---

## 🚀 Próximos Passos

Recursos planejados:
- [ ] Histórico de conversas persistente
- [ ] Exportar conversa para PDF
- [ ] Modo de voz contínua
- [ ] Integração com calendário da Etec
- [ ] Sugestões inteligentes baseadas no histórico

---

**Aproveite sua nova assistente virtual! 🎓✨**
