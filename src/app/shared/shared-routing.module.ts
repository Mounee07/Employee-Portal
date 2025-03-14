// shared-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   { path: 'login', component: LoginComponent } // Route for the Cart component
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
