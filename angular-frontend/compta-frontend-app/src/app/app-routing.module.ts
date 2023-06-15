import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfficeComponent} from "./components/office/office.component";
import {ChatComponent} from "./components/chat/chat.component";
import {TfouComponent} from "./tfou/tfou.component";

const routes: Routes = [
  {path: 'chat/:id',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[TfouComponent]
