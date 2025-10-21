# Sistema de Requerimentos - EtecNotes

## Visão Geral

Sistema completo de envio e gerenciamento de requerimentos estudantis baseado nos formulários oficiais da Etec de Peruíbe (Decreto 58.447 – DOE de 10/10/2012).

## Funcionalidades

### 📄 Tipos de Requerimentos

1. **Requerimento Geral** (Professor - Administrativo)
   - Declarações
   - Atestados
   - Outros (especificar)
   - Justificativa de Falta (com período)

2. **Justificativa de Faltas / Prova Substitutiva**
   - Dados completos do aluno
   - Período de falta (data início e fim)
   - Motivo (Saúde, Viagem, Outros)
   - Documento em anexo (Atestado, Declaração, Outros)
   - Solicitação de prova/trabalho/atividade substitutiva
   - Disciplinas e professores afetados

### 🔄 Fluxo de Uso

1. **Criar Requerimento**
   - Aluno acessa a aba "Requerimentos" no CloudPage
   - Escolhe o tipo: "Requerimento Geral" ou "Justificativa de Falta"
   - Preenche o formulário completo

2. **Revisar Documento**
   - Sistema exibe tela de revisão com todos os dados preenchidos
   - Aluno pode voltar e editar ou confirmar envio
   - Aviso destacado: "Por favor, revise cuidadosamente todas as informações antes de enviar"

3. **Enviar para Administração**
   - Ao confirmar, sistema gera protocolo automático
   - Formato: `RG-2025-XXX` (Requerimento Geral) ou `JF-2025-XXX` (Justificativa de Falta)
   - Requerimento entra em status "Em Análise"

4. **Acompanhar Status**
   - Lista de requerimentos com status visual:
     - 🟡 **Em Análise** (pendente)
     - 🟢 **Aprovado**
     - 🔴 **Recusado**
   - Protocolo, data de envio e descrição

## Estrutura de Arquivos

```
src/components/pages/cloud/
├── CloudPage.jsx                 # Página principal (3 abas: IATEC AI, Requerimentos, Meditação)
├── RequerimentosPage.jsx         # Gerenciador de requerimentos (lista + navegação)
├── RequerimentoGeralForm.jsx     # Formulário de Requerimento Geral
└── JustificativaFaltaForm.jsx    # Formulário de Justificativa de Falta
```

## Componentes

### 1. RequerimentosPage.jsx

**Estado:**
- `activeView`: "list" | "createGeneral" | "createJustificativa" | "review"
- `requerimentos`: Array de requerimentos enviados
- `currentForm`: Dados do formulário em revisão

**Funções Principais:**
- `handleCreateNew(tipo)`: Abre formulário específico
- `handleFormSubmit(formData)`: Recebe dados do formulário e vai para revisão
- `handleConfirmSubmit()`: Confirma envio e gera protocolo
- `getStatusIcon(status)`: Retorna ícone de status
- `getStatusText(status)`: Retorna texto de status

**Views:**
- **Lista**: Cards com requerimentos enviados + botões para criar novo
- **Formulário**: Renderiza form específico (Geral ou Justificativa)
- **Revisão**: Preview completo + botões "Voltar e Editar" / "Confirmar e Enviar"

### 2. RequerimentoGeralForm.jsx

**Campos:**
- Nome Completo *
- RG *
- Matrícula *
- Tipo de Requerimento * (Declaração | Atestado | Outros)
- Justificativa de Falta (checkbox)
  - Período Início
  - Período Fim
- Informações Adicionais (textarea)

**Validação:**
- Campos obrigatórios marcados com *
- HTML5 validation (`required`)
- Descrição automática gerada baseada no tipo selecionado

### 3. JustificativaFaltaForm.jsx

**Seções:**

1. **Dados do Aluno**
   - Nome, Turma, RM, Endereço, Bairro, Cidade, Telefone, Celular

2. **Período da(s) Falta(s)**
   - Data Início e Data Fim

3. **Motivo**
   - Saúde | Viagem | Outros (com campo para especificar)

4. **Documento em Anexo**
   - Atestado | Declaração | Outros
   - Upload de arquivo (PDF, JPG, PNG - máx. 5MB)

5. **Solicitação de Prova Substitutiva**
   - Prova | Trabalho | Atividade | Outros

6. **Disciplinas e Professores**
   - Listas de disciplinas e professores afetados

**Recursos:**
- Upload de documentos com drag & drop
- Validação de tamanho e tipo de arquivo
- Campos condicionais (aparecem conforme seleção)
- Descrição automática no formato: "Falta nos dias DD/MM a DD/MM - Motivo"

## Design System

### Cores

- **Roxo Principal**: `#8C43FF`
- **Roxo Escuro**: `#6B32C3`, `#5927A3`
- **Roxo Claro**: `#58417d`
- **Verde (Aprovado)**: `#22C55E`
- **Amarelo (Pendente)**: `#FFA500`
- **Vermelho (Recusado)**: `#db4040`

### Componentes UI

**Botões de Criação:**
```jsx
// Requerimento Geral
bg-[#8C43FF] hover:bg-[#7A3AE6]

// Justificativa de Falta
bg-[#6B32C3] hover:bg-[#5927A3]
```

**Status Badges:**
```jsx
// Aprovado
bg-green-500/20 text-green-500

// Pendente
bg-yellow-500/20 text-yellow-500

// Recusado
bg-red-500/20 text-red-500
```

**Cards:**
- Border radius: `rounded-2xl` (16px) ou `rounded-3xl` (24px)
- Shadow: `shadow-lg` com efeito `hover:shadow-xl`
- Background dark: `dark:bg-[#1E1E1E]`
- Background light: `bg-white`

## Animações (Framer Motion)

### Transições de Views
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}
```

### Cards de Requerimento
```jsx
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
```

### Botões
```jsx
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

## Geração de Protocolo

**Formato:** `[TIPO]-[ANO]-[NÚMERO]`

Exemplos:
- `RG-2025-001` (Requerimento Geral #1 de 2025)
- `JF-2025-032` (Justificativa de Falta #32 de 2025)

**Lógica:**
```javascript
const tipo = currentForm.tipo === "geral" ? "RG" : "JF"
const ano = new Date().getFullYear()
const numero = String(requerimentos.length + 1).padStart(3, "0")
const protocolo = `${tipo}-${ano}-${numero}`
```

## Integração com Backend (Próximos Passos)

### Endpoints Sugeridos

```javascript
// POST - Criar requerimento
POST /api/requerimentos
Body: {
  tipo: "geral" | "justificativa",
  dados: { ...formData },
  aluno_id: string,
  protocolo: string
}

// GET - Listar requerimentos do aluno
GET /api/requerimentos?aluno_id={id}

// GET - Detalhes de um requerimento
GET /api/requerimentos/{protocolo}

// PUT - Atualizar status (admin)
PUT /api/requerimentos/{protocolo}/status
Body: {
  status: "aprovado" | "pendente" | "recusado",
  observacoes: string
}

// POST - Upload de arquivo
POST /api/requerimentos/{protocolo}/anexo
Body: FormData com arquivo
```

### Notificações

- Email ao aluno quando requerimento for analisado
- Notificação in-app quando status mudar
- Lembrete para administração de requerimentos pendentes

## Melhorias Futuras

### Funcionalidades

- [ ] Sistema de notificações em tempo real (WebSocket)
- [ ] Histórico completo com timeline
- [ ] Comentários/observações do coordenador
- [ ] Assinatura digital
- [ ] Exportar requerimento como PDF
- [ ] Filtros por status, data, tipo
- [ ] Busca por protocolo
- [ ] Rascunhos salvos automaticamente
- [ ] Anexar múltiplos arquivos
- [ ] Validação de CPF/RG
- [ ] Preenchimento automático com dados do perfil

### UX

- [ ] Tutorial interativo no primeiro acesso
- [ ] Tooltips explicativos nos campos
- [ ] Validação em tempo real
- [ ] Contador de caracteres em textareas
- [ ] Autocomplete de endereço (ViaCEP)
- [ ] Seleção de disciplinas/professores via dropdown
- [ ] Preview do PDF antes de enviar
- [ ] Confirmação de leitura de termos
- [ ] Modo de impressão otimizado

### Acessibilidade

- [ ] Labels descritivos para screen readers
- [ ] Navegação por teclado (Tab, Enter, Esc)
- [ ] ARIA labels em ícones
- [ ] Contraste de cores WCAG AA
- [ ] Tamanho mínimo de botões (44x44px)
- [ ] Feedback sonoro em ações importantes

## Segurança

### Implementar

- Autenticação obrigatória (JWT)
- Validação de sessão ao enviar formulário
- Rate limiting (máx. 5 requerimentos por dia)
- Sanitização de inputs (prevenir XSS)
- Upload de arquivos apenas com tipos permitidos
- Scan de antivírus em uploads
- Criptografia de dados sensíveis (RG, CPF)
- Logs de auditoria (quem enviou, quando, IP)
- Assinatura digital com certificado

## Responsividade

### Breakpoints
- **Mobile**: < 768px (layout vertical, cards empilhados)
- **Tablet**: 768px - 1024px (grid 1 coluna)
- **Desktop**: > 1024px (grid 2 colunas)

### Mobile First
Todos os formulários foram projetados com foco em dispositivos móveis:
- Inputs grandes (mínimo 48px de altura)
- Espaçamento generoso entre campos
- Botões full-width em telas pequenas
- Teclado numérico para telefone/celular
- Date picker nativo do navegador

## Testes

### Casos de Teste

1. **Criação de Requerimento Geral**
   - Preencher todos os campos obrigatórios
   - Tentar enviar sem preencher campos obrigatórios
   - Adicionar justificativa de falta
   - Verificar geração de protocolo

2. **Criação de Justificativa de Falta**
   - Preencher dados do aluno
   - Selecionar período de falta
   - Escolher motivo e anexar documento
   - Solicitar prova substitutiva
   - Listar disciplinas

3. **Revisão de Documento**
   - Voltar e editar campos
   - Confirmar envio
   - Verificar persistência dos dados

4. **Lista de Requerimentos**
   - Visualizar todos os requerimentos
   - Filtrar por status
   - Ver detalhes de um requerimento específico

5. **Estados de Erro**
   - Falha de upload de arquivo
   - Erro de conexão ao enviar
   - Timeout do servidor

## Changelog

### v1.0.0 (Outubro 2025)
- ✅ Implementação inicial
- ✅ Formulário de Requerimento Geral
- ✅ Formulário de Justificativa de Falta
- ✅ Sistema de revisão antes do envio
- ✅ Lista de requerimentos com status
- ✅ Geração automática de protocolo
- ✅ Integração na aba de Requerimentos do CloudPage
- ✅ Design responsivo dark/light mode

## Licença

Este sistema faz parte do EtecNotes e segue os direitos autorais da Etec de Peruíbe.

---

**Desenvolvido por:** EtecDevs  
**Data:** Outubro 2025  
**Versão:** 1.0.0
