import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { NgForm } from '@angular/forms';
import {
  catchError,
  finalize,
  firstValueFrom,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { hasControlValid } from '../../utils/has-control-valid';
import { Toast } from 'bootstrap';
import { environment } from '../../../environments/environment';
import {
  TColorSuffix,
  TError,
  TViaCep,
  TViaCepMapped,
} from '../../types/types';
import { hasPropertyGuard } from '../../utils/has-property-guard';
import { removeNonNumeric } from '../../utils/remove-non-numeric';
import safeRunInAngularCycle from '../../utils/safe-run-in-angular-cycle';
import { LoadingService } from '../../services/loading.service';
import { DynamicDelayService } from '../../services/dynamic-delay.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('errorToastRef') public errorToastRef!: ElementRef<HTMLDivElement>;
  @ViewChild('form')
  form!: NgForm;
  @ViewChild('zipCodeRef') zipCodeRef!: ElementRef<HTMLInputElement>;

  public zipCodeMaxLength!: number;
  public maximumAttributeValue!: string | null;
  public message!: string;
  public colorSuffix: TColorSuffix = 'danger';
  public isFormValid: boolean = false;
  public hasError: boolean = false;
  public env: boolean = false;
  public isSubmitted: boolean = false;
  public viaCep$!: Observable<TViaCep>;
  public loading$!: Observable<boolean>;
  public timing$!: Observable<number>;
  public storedData!: TViaCepMapped;
  private zipCodeInput$: Subject<string> = new Subject<string>();
  private postSubscription!: Subscription;

  private readonly emptyViaCep: TViaCep = {
    zipCode: undefined,
    street: '',
    complement: undefined,
    neighborhood: '',
    city: '',
    state: '',
  };

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly loadingService: LoadingService,
    private readonly ngZone: NgZone,
    private readonly dynamicDelayService: DynamicDelayService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.env = environment.production;
    this.loading$ = this.loadingService.loading$;
    this.timing$ = this.dynamicDelayService.timing$;

    this.viaCep$ = this.zipCodeInput$.pipe(
      tap(() => this.loadingService.setLoading(true)),
      // delay(0),
      switchMap((zipCode) =>
        this.httpClientService.getAddressFromViaCep(zipCode).pipe(
          tap({
            next: async (response) => {
              if (hasPropertyGuard<TError>(response, 'erro')) {
                this.handleToast('Cep não encontrado!', true);
              } else {
                await this.fillFields(response);
                this.isFormValid =
                  response &&
                  Object.values(response).every((index) => index !== '');
              }
            },
          }),
          catchError((error) => {
            this.handleToast(error || 'Erro desconhecido!', true);
            return of(this.emptyViaCep);
          }),
          finalize(() => this.loadingService.setLoading(false))
        )
      ),
      startWith(this.emptyViaCep),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }

  public onChange(value: string) {
    let element = this.zipCodeRef.nativeElement;

    value = removeNonNumeric(value);

    this.zipCodeMaxLength = removeNonNumeric((element.value = value)).length;

    if (value.length > 8) element.value = value.substring(0, 8);
  }

  public onFocus() {
    if (this.hasError || hasControlValid(this.form)) this.clearAll();
  }

  public onBlur() {
    let value: string;
    if (this.hasValidZipCode((value = this.zipCodeRef.nativeElement.value)))
      this.zipCodeInput$.next(value);
    else if (
      this.form.dirty &&
      this.zipCodeMaxLength !== 8 &&
      this.zipCodeRef.nativeElement.value
    ) {
      this.handleToast('Formato de cep inválido!', true);
    }
    return;
  }

  public onSubmit(form: NgForm) {
    if (!hasControlValid(form)) return;

    this.loadingService.setLoading(true);
    this.isSubmitted = true;

    this.postSubscription = this.httpClientService
      .postToIHttpBin(form.value)
      .subscribe({
        next: () => this.handleToast('Simulação de envio com sucesso!', false),
        error: async (error) => {
          this.handleToast(error, true);
          await this.fillFields(this.storedData);
        },
        complete: () => {},
      });
  }

  private hasValidZipCode(value: string) {
    return value !== '' && /^[0-9]{8}$/.test(value);
  }

  private handleToast(message: string, hasError: boolean) {
    this.loadingService.setLoading(false);
    this.isSubmitted = false;
    this.hasError = hasError;

    if (this.hasError) this.colorSuffix = 'danger';
    else this.colorSuffix = 'success';

    safeRunInAngularCycle(this.ngZone, message, (msg) => {
      this.message = msg;
    });

    this.toast();

    if (!hasError && !this.isSubmitted) this.clearAll();
  }

  private async fillFields(response: TViaCepMapped) {
    this.dynamicDelayService.getTimingFromApiServerTiming();
    const delayMs = Math.round(await firstValueFrom(this.timing$));

    safeRunInAngularCycle(
      this.ngZone,
      response,
      (res) => {
        const formGroup = this.form.form;
        const addressGroup = formGroup.controls['address'];
        if (addressGroup) {
          formGroup.patchValue({
            ...(res.zipCode ? { zipCode: res.zipCode } : ''),
            address: {
              city: res.city,
              complement: res.complement,
              neighborhood: res.neighborhood,
              street: res.street,
              state: res.state,
            },
          });
        }
        this.storedData = res;
      },
      delayMs
    );
  }

  private toast() {
    const toastEl = this.errorToastRef.nativeElement;
    const toast = new Toast(toastEl, { delay: 2000 });
    toast.show();
  }

  private clearAll() {
    this.form?.resetForm({ zipCode: '' });
    this.postSubscription?.unsubscribe();
    this.clearFlags();
  }

  private clearFlags() {
    if (this.isFormValid) this.isFormValid = false;
    if (this.hasError) this.hasError = false;
    this.loadingService.setLoading(false);
  }
}
