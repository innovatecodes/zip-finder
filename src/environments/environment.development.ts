import { IEnvironment } from './environment.d';

export const environment: IEnvironment = {
  production: false,
  viaCepEndpoint: 'https://viacep.com.br/ws/',
  httpBinEndpoint: 'https://httpbin.org/post',
  jsonServerEndpoint: 'http://localhost:3000/posts',
  endpointUri: '/api/post',
};
