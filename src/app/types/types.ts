import { IPayload, IViaCep } from '../interfaces';

export type TZipCode = {
  zipCode: string;
};

export type TError = {
  erro: boolean;
};

export type TMakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * Tipo que representa a requisição de endereço (payload) enviada para a API.
 *
 * Combina três partes:
 * 1. `TZipCode` - adiciona a propriedade `zipCode` obrigatória.
 * 2. `Omit<IPayload['address'], 'complement'>` - inclui todas as propriedades do endereço
 *    definidas em `IPayload['address']`, exceto `complement`.
 * 3. `Partial<Pick<IPayload['address'], 'complement'>>` - adiciona `complement` como opcional,
 *    permitindo que o endereço enviado nem sempre tenha complemento.
 *
 * Assim, o payload final terá todas as propriedades do endereço, sendo que apenas
 * `complement` pode estar ausente.
 */
export type TPayloadRequest = TZipCode &
  Omit<IPayload['address'], 'complement'> &
  Partial<Pick<IPayload['address'], 'complement'>>;

/**
 * @template T
 * Este tipo genérico mapeia chaves de um objeto do PT para EN.
 *
 * Cada propriedade do objeto original T é renomeada para o equivalente em inglês.
 *
 * Por exemplo, se o objeto T tiver a propriedade 'ddd':
 * - O tipo de 'ddd' será igual ao tipo original em T.
 * - O '?' indica que essa propriedade é opcional, pois nem todo objeto terá 'ddd'.
 *
 * Isso serve como exemplo para outras propriedades extras que possam existir no objeto.
 */
export type RenameKeys<T> = {
  zipCode?: T extends { cep: infer U } ? U : never;
  street: T extends { logradouro: infer U } ? U : never;
  complement?: T extends { complemento: infer U } ? U : never;
  neighborhood: T extends { bairro: infer U } ? U : never;
  city: T extends { localidade: infer U } ? U : never;
  state: T extends { uf: infer U } ? U : never;
};

export type TViaCepMapped = RenameKeys<IViaCep>;

export type TViaCep = TError | TViaCepMapped;

export type TColorSuffix = 'success' | 'danger';
