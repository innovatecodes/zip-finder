/**
 * Script responsável por tratar problemas relacionados a CORS durante o desenvolvimento
 *
 * No package.json adicione --proxy-config proxy-conf.js ao script:
 *    "scripts": {
 *      "start": "ng serve --proxy-config proxy-conf.js"
 *    }
 *
 * Execute: npm start
 *
 * Observações:
 * O proxy permite que você faça chamadas para um servidor externo (API) sem esbarrar nas regras de CORS do navegador.
 * `changeOrigin: true` altera o cabeçalho "Host" da requisição para coincidir com o domínio de destino.
 * Isso evita erros de certificado e de política de origem cruzada.
 * `secure: true` garante que o proxy valide o certificado SSL do servidor de destino.
 * `pathRewrite` remove o prefixo "/api" antes de enviar a requisição, permitindo uma URL mais limpa.
 */

const PROXY_CONFIG = [
  {
    // Define quais caminhos o proxy vai interceptar
    context: ["/api"], // ex: qualquer requisição para "/api/..." será redirecionada

    // Destino final da requisição
    target: "https://httpbin.org", // API ou servidor que receberá a requisição

    // Configurações de segurança e cabeçalho
    secure: true, // valida o certificado SSL do destino
    changeOrigin: true, // modifica o "Host" para coincidir com o destino

    // Nível de log do proxy
    logLevel: "debug", // mostra detalhes das requisições no console para depuração

    // Reescrita do caminho da URL
    pathRewrite: { "^/api": "" }, // remove "/api" antes de enviar para o servidor de destino
  },
];

// Exporta a configuração para que o Angular (ou outro servidor dev) utilize o proxy
module.exports = PROXY_CONFIG;
