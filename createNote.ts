#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const ask = async (query: string): Promise<string> => {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(query);
  rl.close();
  return answer.trim();
};

const main = async () => {
  console.log('📝 Criador de notas de reunião (TypeScript)\n');

  const projectName = await ask('🔖 Nome do projeto (ex: pagamentos): ');
  const meetingName = await ask('🗓️ Nome da reunião: ');
  const dateInput = await ask('📅 Data (AAAA-MM-DD, enter p/ hoje): ');
  const participants = await ask('👥 Participantes: ');
  const projectClient = await ask('🏷️ Projeto/Cliente/Time: ');
  const objective = await ask('🎯 Objetivo da reunião: ');

  const today = new Date();
  const date = dateInput || today.toISOString().split('T')[0];
  const sanitizedProject = projectName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const fileName = `${date}-${sanitizedProject}.md`;
  const notesDir = path.join(__dirname, 'notes');
  const filePath = path.join(notesDir, fileName);

  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir, { recursive: true });
  }

  const content = `# Reunião: ${meetingName}

📅 **Data:** ${date}  
🧑 **Participantes:** ${participants}  
🏷️ **Projeto/Cliente/Time:** ${projectClient}

---

### 🎯 Objetivo da reunião
${objective}

---

### ✅ Principais tópicos discutidos
- 

---

### 📌 Ações definidas
| O quê                             | Quem               | Prazo        |
|-----------------------------------|--------------------|--------------|
|                                   |                    |              |

---

### ❓ Dúvidas abertas / pontos pendentes
- 

---

### 🗂️ Anexos/Links úteis
- 

---

### 📝 Resumo final (3-5 linhas)
`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Nota criada com sucesso em: ${filePath}`);
};

main();
