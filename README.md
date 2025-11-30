# TaskFlow JS – Gerenciador de Tarefas com Callbacks


- **Descrição:** Aplicação em JavaScript para gestão de tarefas no navegador, usando função anônima para cadastro dinâmico, arrow functions para listagem detalhada e callbacks para remover, atualizar e concluir itens. Interação via prompt() e feedback no console.log(), priorizando código limpo, reuso de lógica e fácil manutenção. Documentação enxuta para portfólio.

## O que o projeto mostra
- Função anônima para adicionar tarefas em memória.
- Arrow function para listar tarefas com índice.
- Função de orquestração que recebe callbacks para remover, atualizar ou concluir itens.
- Interação via `prompt()` e logs no console para acompanhar cada ação.

## Estrutura
```
taskflow-js/
├─ index.html        -> HTML simples para abrir no navegador
└─ src/
   └─ taskflow.js    -> Lógica principal (função anônima, arrow e callbacks)
```

## Como executar
1) Abra `index.html` no navegador (duplo clique já funciona).  
2) Siga os prompts: adicione tarefas, liste-as e aplique operações de remover, atualizar ou concluir.  
3) Acompanhe o resultado no console do navegador (F12).

## Pontos de demonstração técnica
- Reúso de lógica por callbacks para aplicar múltiplas operações sem duplicar código.
- Separação clara entre coleta de entrada (`prompt`) e efeitos (console + array).
- Código curto, comentado apenas onde a leitura não é óbvia.
