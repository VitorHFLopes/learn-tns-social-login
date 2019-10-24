import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppComponent } from './app.component';
import { NativeScriptFacebookModule } from 'nativescript-facebook/angular';
import * as application from 'tns-core-modules/application';
import * as facebook from 'nativescript-facebook';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

application.on(application.launchEvent, function (args) {
  facebook.init('453480265314590');
  facebook.initAnalytics();
});

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFacebookModule,
    NativeScriptHttpClientModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})
/*
 Pass your application module to the bootstrapModule function located in main.ts to start your app
 */
export class AppModule {
}
