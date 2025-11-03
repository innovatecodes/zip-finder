/**
 * Guarda de tipo que verifica se um valor é um objeto não nulo e, opcionalmente,
 * se contém uma propriedade específica.
 *
 * @template T Tipo esperado do objeto quando a guarda for satisfeita.
 * @param obj Valor a ser verificado — deve ser um objeto não nulo para retornar true.
 * @param prop (Opcional) Nome da propriedade a verificar. Se omitido, a função
 *             apenas confirma que `obj` é um objeto não nulo.
 * @returns Verdadeiro se `obj` for um objeto não nulo (e contiver `prop`, quando fornecida).
 *          O retorno é um type predicate (`obj is T`) para auxiliar o compilador TypeScript.
 *
 * @remarks
 * - A existência da propriedade é checada com o operador `in`, portanto propriedades
 *   herdadas via protótipo também são consideradas.
 * - Arrays são tratados como objetos; funções não (pois `typeof` de função é "function").
 * - `null` é explicitamente excluído.
 * - `prop` aceita chaves de tipo `string | number | symbol` (representado por `keyof any`).
 *
 * @example
 * const value: unknown = { id: 123, name: 'Arquivo' };
 * if (hasPropertyGuard<{ id: number }>(value, 'id')) {
 *   // Aqui o compilador sabe que `value` tem a propriedade `id: number`
 *   console.log(value.id + 1);
 * }
 */
export const hasPropertyGuard = <T extends object>(
  obj: unknown,
  prop?: keyof any
): obj is T => {
  return (
    !(typeof obj !== 'object' || obj == null) && (prop == null || prop in obj)
  );
};
