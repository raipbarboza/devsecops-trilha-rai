# Trilha DevSecOps — Rai Barboza

Repositório de estudos da trilha DevSecOps do SACI, com uma API didática em Node.js/Express e práticas de integração contínua, testes e análise estática de segurança.

## Navegação

- [Bloco 1](bloco1/rai.md): registro inicial da trilha.
- [API de tarefas](app/README.md): execução e endpoints.
- [Bloco 2](bloco2/README.md): workflow, correções e evidências antes/depois.
- [Workflow de CI](.github/workflows/ci.yml): verificação de sintaxe, testes e Semgrep.
- `bloco3/`: diretório reservado para a continuidade da trilha.

## Execução local

Pré-requisito: Node.js 22 com npm.

```bash
git clone https://github.com/raipbarboza/devsecops-trilha-rai.git
cd devsecops-trilha-rai/app
npm ci --ignore-scripts
npm test
npm start
```

A API usa a porta 3000 por padrão. Consulte os detalhes e limites no README da aplicação.

## Entregas publicadas

- Testes de integração da API.
- CI no GitHub Actions com análise Semgrep.
- Remoção de `eval` do filtro de tarefas e validação de nomes de arquivos.
- Evidências das verificações antes e depois das correções.

## Limites do estudo

A aplicação deriva de uma base com vulnerabilidades didáticas e ainda contém problemas documentados no Bloco 2. O resultado do SAST se limita às regras e severidades configuradas; não equivale a uma aplicação pronta para produção. Proteção de branches e implantação são configurações separadas do workflow.

## Autor

[Rai Barboza](https://www.linkedin.com/in/rai-barboza-01a90a262/)
