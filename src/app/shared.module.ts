import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';

// FontAwesome
// TODO: Choose a icon library
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { RouterModule } from '@angular/router';
library.add(fas,far,fal);


@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgZorroAntdModule,
    FontAwesomeModule,
  ]
})
export class SharedModule { }
