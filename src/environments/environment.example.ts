// environment.d.ts + exemplo de uso
// Este arquivo define a interface do ambiente (IEnvironment)
// e um exemplo de objeto de configuração (environment).
// Ele serve para centralizar URLs e variáveis que mudam
// entre desenvolvimento, teste e produção.

// Interface que define o formato padrão dos arquivos de ambiente
export interface IEnvironment {
  // Indica se o app está rodando em modo de produção
  production: boolean;

  // URL base da API ViaCep usada para consultar endereços por CEP
  viaCepEndpoint: string;

  // (Opcional) URL da API HttpBin — útil para testar requisições HTTP
  httpBinEndpoint?: string;

  // (Opcional) URL da API JSON Server ou de uma API local de teste
  jsonServerEndpoint?: string;

  // Hack para proxy
  endpointUri?: string;
}

// Objeto de configuração do ambiente atual (exemplo de desenvolvimento)
export const environment: IEnvironment = {
  production: false, // Indica que NÃO é produção (modo dev)
  viaCepEndpoint: 'https://viacep.com.br/ws/', // API pública ViaCep — retorna dados de CEPs
  httpBinEndpoint: 'https://httpbin.org/post', // API usada para testar requisições HTTP POST
  jsonServerEndpoint: 'http://localhost:3000/posts', // API local (JSON Server) — dados mockados
  endpointUri: '/api/post', // URI relativa de um endpoint específico
};
