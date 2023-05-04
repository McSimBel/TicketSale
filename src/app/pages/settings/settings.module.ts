import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {TabViewModule} from "primeng/tabview";
import {ToastModule} from "primeng/toast";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StatisticComponent } from './statistic/statistic.component';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    TableModule,
    ToastModule,
    FormsModule,
    InputTextModule
  ],
  providers: [MessageService]
})
export class SettingsModule { }
