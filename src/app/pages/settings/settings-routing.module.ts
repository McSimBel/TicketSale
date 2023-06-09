import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsComponent} from "../tickets/tickets.component";
import {SettingsComponent} from "./settings.component";

const routes: Routes = [
  { path: '', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
