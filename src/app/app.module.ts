import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WebStorageModule } from 'ngx-store';


// electron
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from './directives/webview.directive';

// translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


// own items
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    WebStorageModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ElectronService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
