import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';

import { FormComponent } from './components/form/form.component';

// Módulo que agrupa e exporta componentes, pipes e diretivas reutilizáveis (UI)

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaxLengthDirective } from './components/form/directives/max-length.directive';
import { CustomClassDirective } from './components/form/directives/custom-class.directive';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MaxLengthDirective,
    CustomClassDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
