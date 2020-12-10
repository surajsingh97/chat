import * as core from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@core.NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
