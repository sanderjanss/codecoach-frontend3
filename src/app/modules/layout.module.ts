import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { LayoutComponent } from '../layout/layout/layout.component';
import {RouterModule} from "@angular/router";
import { NavigationComponent } from '../layout/navigation/navigation.component';
import { MaterialModule } from './material.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    NavigationComponent,
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    MatIconModule,
    ]
})
export class LayoutModule { }
