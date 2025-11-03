import { NgZone } from '@angular/core';

/**
 * Atualiza uma variável ligada ao template de forma segura, evitando o erro: "ExpressionChangedAfterItHasBeenCheckedError"
 *
 * @param ngZone - instância do NgZone do angular
 * @param value - valor que será atribuído à variável
 * @param callback - função que atualiza a variável no componente/template
 */
const safeRunInAngularCycle = <T>(
  ngZone: NgZone,
  value: T,
  callback: (param: T) => void,
  ms?: number
) => {
  // Sai da zona do angular, o angular não monitora o que acontece aqui dentro.
  // Evita erros quando atualizamos variáveis depois que o ciclo de detecção de mudanças já passou.
  ngZone.runOutsideAngular(() => {
    // Agenda a execução no próximo ciclo do javaScript
    // setTimeout com 0ms coloca a execução na fila de eventos,
    // garantindo que o ciclo atual de verificação do angular já tenha terminado.
    setTimeout(() => {
      // Volta para a zona do angula, quando algo muda e atualiza o template de forma segura.
      ngZone.run(() => {
        callback(value);
      });
    }, ms ?? 0);
  });

  return value;
};

export default safeRunInAngularCycle;
