# Zip Finder

Aplicação Angular para consulta e busca de CEPs (Códigos de Endereçamento Postal).

## 📋 Sobre o Projeto

Zip Finder é uma aplicação web desenvolvida em Angular que permite aos usuários buscar informações de endereços através de CEPs de forma rápida e intuitiva.

## 🚀 Tecnologias Utilizadas

- **Angular 20.1.0** - Framework principal
- **Bootstrap 5.3.8** - Framework CSS para estilização
- **RxJS 7.8.0** - Programação reativa
- **TypeScript 5.8.2** - Linguagem de programação
- **JSON Server** - Mock de API REST para desenvolvimento

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior recomendada)
- npm (gerenciador de pacotes)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd zip-finder
```

2. Instale as dependências:
```bash
npm install
```

## ⚙️ Comandos Disponíveis

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento com proxy configurado
npm start
```
A aplicação estará disponível em `http://localhost:4200/`

### Build

```bash
# Gera build de produção
npm run build

# Gera build em modo de desenvolvimento com watch
npm run watch
```

### JSON Server (Mock API)

```bash
# Inicia o servidor mock na porta 3000
npm run json-server
```

## 🏗️ Estrutura do Projeto

O projeto utiliza a estrutura padrão do Angular CLI com as seguintes configurações:

- **Proxy Configuration**: Configurado através do arquivo `proxy-conf.js`
- **Prettier**: Configurado para formatar arquivos HTML com parser Angular

## 🧪 Testes

O projeto possui configuração de testes com Jasmine e Karma, porém os testes não estão implementados no momento.

## 📝 Scripts Personalizados

- `ng` - CLI do Angular
- `start` - Inicia servidor com proxy
- `build` - Build de produção
- `watch` - Build contínuo para desenvolvimento
- `json-server` - Servidor mock de API

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 👤 Autor

**Ronaldo Lopes**

- GitHub: [@innovatecodes](https://github.com/innovatecodes)
- LinkedIn: [innovatecodes](https://linkedin.com/in/innovatecodes)

## 👨‍💻 Desenvolvimento

Desenvolvido com Angular CLI versão 20.1.4

---

Para mais informações sobre Angular CLI, use `ng help` ou visite a [documentação oficial do Angular](https://angular.io/).