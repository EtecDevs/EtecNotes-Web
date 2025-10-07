# 💳 Sistema de Pagamento de Eventos - EtecNotes

Sistema completo para gerenciamento de participação em eventos pagos, com upload de comprovantes via PIX e validação pela Secretaria.

## 📁 Arquivos do Sistema

### Para Alunos:
- **`EventsPage.jsx`** - Listagem de eventos (gratuitos e pagos)
- **`EventConfirmationPage.jsx`** - Página de confirmação e envio de comprovante

### Para Secretaria:
- **`EventPaymentsManager.jsx`** - Painel de gerenciamento de comprovantes

### Arquivos Antigos (Substituídos):
- ~~`participarEvento.jsx`~~ - Substituído por `EventConfirmationPage.jsx`
- ~~`comprovantesPage.jsx`~~ - Substituído por `EventPaymentsManager.jsx`

## 🎯 Funcionalidades Implementadas

### ✅ Para Alunos:

1. **Visualização de Eventos**
   - Badge visual para eventos pagos
   - Diferenciação clara entre eventos gratuitos e pagos
   - Informações completas (data, horário, local, valor)

2. **Participação em Eventos Pagos**
   - Redirecionamento automático para página de pagamento
   - Cópia de chave PIX com um clique
   - Upload de comprovante (JPG, PNG, PDF)
   - Preview de imagens antes do envio
   - Validação de arquivo (tipo e tamanho máx 5MB)
   - Feedback visual de sucesso/erro
   - Dados do aluno preenchidos automaticamente

3. **Participação em Eventos Gratuitos**
   - Confirmação simples de presença
   - Sem necessidade de comprovante

### ✅ Para Secretaria:

1. **Dashboard Estatístico**
   - Total de comprovantes
   - Pendentes de aprovação
   - Aprovados
   - Rejeitados
   - Valor total arrecadado

2. **Gerenciamento de Comprovantes**
   - Busca por nome, email, RM ou evento
   - Filtros por status (todos, pendentes, aprovados, rejeitados)
   - Visualização detalhada de cada comprovante
   - Preview de imagens/PDFs
   - Download de comprovantes
   - Aprovação com observações opcionais
   - Rejeição com justificativa obrigatória
   - Histórico completo de revisões

## 🚀 Como Usar

### Fluxo do Aluno:

1. **Fazer Login**
   ```
   Email: aluno@teste.com
   Senha: 123456
   RM: 12345
   ```

2. **Navegar para Eventos**
   - Ir para a página de eventos
   - Visualizar eventos disponíveis

3. **Participar de Evento Pago**
   - Clicar em "Participar (Pago)" no evento desejado
   - Copiar a chave PIX
   - Realizar o pagamento via PIX
   - Anexar o comprovante (imagem ou PDF)
   - Enviar

4. **Aguardar Aprovação**
   - Sistema mostra mensagem de confirmação
   - Aguardar validação da Secretaria

### Fluxo da Secretaria:

1. **Fazer Login**
   ```
   Email: secretaria@teste.com
   Senha: 123456
   ```

2. **Acessar Painel de Comprovantes**
   - Ir para "Gerenciar Comprovantes"
   - Ver estatísticas em tempo real

3. **Revisar Comprovantes**
   - Clicar em "Revisar" no comprovante
   - Visualizar imagem/PDF
   - Baixar comprovante se necessário

4. **Aprovar ou Rejeitar**
   - **Aprovar**: Adicionar observações (opcional) → Aprovar
   - **Rejeitar**: Adicionar justificativa (obrigatório) → Rejeitar

## 📊 Estrutura de Dados

### Evento:
```javascript
{
  id: number,
  title: string,
  shortDescription: string,
  fullDescription: string,
  date: string, // YYYY-MM-DD
  time: string, // HH:MM
  location: string,
  image: string,
  isPaid: boolean,
  price: number // em reais
}
```

### Comprovante:
```javascript
{
  id: number,
  eventId: number,
  eventTitle: string,
  eventDate: string,
  eventPrice: number,
  userId: string,
  userName: string,
  userEmail: string,
  userRm: string,
  receiptFile: string,
  receiptUrl: string,
  submittedAt: string, // ISO date
  status: 'pending' | 'approved' | 'rejected',
  reviewedAt: string | null,
  reviewedBy: string | null,
  notes: string
}
```

## 🔧 Integração com Backend

### Endpoints Necessários:

#### 1. Enviar Comprovante (Aluno)
```javascript
POST /api/events/payments/submit
Content-Type: multipart/form-data

Body:
- eventId: number
- eventTitle: string
- eventDate: string
- eventPrice: number
- userId: string
- userName: string
- userEmail: string
- userRm: string
- receipt: File
- pixKey: string
- submittedAt: string
- status: 'pending'

Headers:
- Authorization: Bearer <token>

Response:
{
  success: boolean,
  message: string,
  receiptId: number
}
```

#### 2. Listar Comprovantes (Secretaria)
```javascript
GET /api/events/payments
Query params:
- status: 'all' | 'pending' | 'approved' | 'rejected'
- search: string (opcional)
- page: number (opcional)
- limit: number (opcional)

Headers:
- Authorization: Bearer <token>

Response:
{
  success: boolean,
  data: Receipt[],
  total: number,
  page: number,
  totalPages: number
}
```

#### 3. Aprovar/Rejeitar Comprovante (Secretaria)
```javascript
PATCH /api/events/payments/:id
Content-Type: application/json

Body:
{
  status: 'approved' | 'rejected',
  notes: string,
  reviewedBy: string
}

Headers:
- Authorization: Bearer <token>

Response:
{
  success: boolean,
  message: string,
  receipt: Receipt
}
```

#### 4. Download de Comprovante (Secretaria)
```javascript
GET /api/events/payments/:id/download

Headers:
- Authorization: Bearer <token>

Response:
- File (image/jpeg, image/png, application/pdf)
```

### Armazenamento de Arquivos:

**Opções Recomendadas:**
1. **Firebase Storage** (já integrado ao projeto)
2. AWS S3
3. Azure Blob Storage
4. Servidor próprio com armazenamento local

**Exemplo com Firebase Storage:**
```javascript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'

async function uploadReceipt(file, userId, eventId) {
  const filename = `receipts/${userId}/${eventId}_${Date.now()}_${file.name}`
  const storageRef = ref(storage, filename)
  
  await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(storageRef)
  
  return downloadURL
}
```

## 🎨 Melhorias Implementadas

### Em relação aos arquivos antigos:

1. ✅ **Compatibilidade com React Router** (sem dependência do Next.js)
2. ✅ **Integração com sistema de autenticação** (useAuth)
3. ✅ **Preview de imagens** antes do envio
4. ✅ **Validação de arquivos** (tipo e tamanho)
5. ✅ **Dashboard com estatísticas** para Secretaria
6. ✅ **Filtros e busca avançada**
7. ✅ **Download de comprovantes**
8. ✅ **Design responsivo e moderno**
9. ✅ **Dark mode suportado**
10. ✅ **Feedback visual aprimorado**
11. ✅ **Logs detalhados para debug**
12. ✅ **Comentários TODO para implementação backend**

## 📝 TODO (Próximos Passos)

- [ ] Implementar endpoints no backend
- [ ] Configurar Firebase Storage para upload de arquivos
- [ ] Adicionar notificações para o aluno quando comprovante for aprovado/rejeitado
- [ ] Implementar paginação na lista de comprovantes
- [ ] Adicionar filtro por data
- [ ] Criar relatório de pagamentos (exportar CSV/PDF)
- [ ] Adicionar histórico de alterações de status
- [ ] Implementar sistema de comentários entre Secretaria e Aluno
- [ ] Adicionar validação automática de comprovantes (OCR)
- [ ] Criar dashboard de estatísticas avançadas

## 🆕 Eventos de Exemplo

### Gratuitos:
1. Feira Tecnológica
2. Palestra: Mercado de Trabalho em TI
3. Semana da Sustentabilidade
4. Mostra Cultural
5. Feira de Profissões

### Pagos:
1. Workshop de Programação - R$ 25,00
2. Competição de Robótica - R$ 15,00
3. Hackathon Etec 2025 - R$ 50,00

## 🔐 Segurança

### Validações Implementadas:
- ✅ Autenticação obrigatória
- ✅ Verificação de role (aluno/secretaria)
- ✅ Validação de tipo de arquivo
- ✅ Limite de tamanho de arquivo (5MB)
- ✅ Sanitização de dados

### Recomendações para Produção:
- [ ] Implementar rate limiting
- [ ] Adicionar antivírus scan nos uploads
- [ ] Criptografar dados sensíveis
- [ ] Adicionar logs de auditoria
- [ ] Implementar backup automático de comprovantes
- [ ] Adicionar watermark nos comprovantes

## 📱 Responsividade

✅ Mobile (< 768px)
✅ Tablet (768px - 1024px)
✅ Desktop (> 1024px)

## 🎨 Paleta de Cores

- **Principal**: `#8C43FF` (Roxo)
- **Secundária**: `#CCA9DD` (Roxo claro)
- **Sucesso**: `#10B981` (Verde)
- **Erro**: `#EF4444` (Vermelho)
- **Aviso**: `#F59E0B` (Amarelo)
- **Info**: `#3B82F6` (Azul)

## 📞 Suporte

Para dúvidas ou problemas:
- Documentação: Este arquivo
- Issues: GitHub do projeto
- Email: suporte@etecnotes.com

---

**Desenvolvido por:** EtecDevs Team  
**Versão:** 2.0  
**Data:** Outubro 2025
