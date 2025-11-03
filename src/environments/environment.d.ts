// environment.d.ts
export interface IEnvironment {
  production: boolean;
  viaCepEndpoint: string;
  httpBinEndpoint?: string;
  jsonServerEndpoint?: string;
  endpointUri?: string;
}
