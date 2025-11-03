import { TViaCep, TViaCepMapped, TError } from '../types/types';
import { hasPropertyGuard } from './has-property-guard';
import { IRawViaCepResponse } from '../interfaces/';

export default function toAddress(rawData: IRawViaCepResponse): TViaCep {
  if (hasPropertyGuard<TError>(rawData, 'erro'))
    return { erro: true } as TError;

  const { cep, logradouro, complemento, bairro, localidade, uf } = rawData;

  return {
    zipCode: cep || undefined,
    street: logradouro,
    complement: complemento || undefined,
    neighborhood: bairro,
    city: localidade,
    state: uf,
  } as TViaCepMapped;
}
