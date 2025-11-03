import { TPayloadRequest, TMakeOptional } from '../types/types';

export interface IRawViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface IViaCep
  extends TMakeOptional<
    IRawViaCepResponse,
    | 'cep'
    | 'complemento'
    | 'unidade'
    | 'estado'
    | 'regiao'
    | 'ibge'
    | 'gia'
    | 'ddd'
    | 'siafi'
  > {}

export interface IPayload {
  zipCode: string;
  address: {
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export interface IHttpBinResponse<T> {
  args: any;
  data: string;
  json: T;
  headers: any;
  origin: string;
  url: string;
}

export interface IPayloadResponse extends TPayloadRequest {}

export interface IJsonServerResponse extends IPayloadResponse {
  id: string;
}
