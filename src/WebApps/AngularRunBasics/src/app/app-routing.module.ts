import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";

import { AuthGuard } from './_guards/auth.guard'
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
//import { NotFoundComponent } from './errors/not-found/not-found.component';
//import { ServerErrorComponent } from './errors/server-error/server-error.component';
//import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
//import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
//import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
//import { AdminGuard } from './_guards/admin.guard';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      //{ path: 'members', component: MemberListComponent },
      //{ path: 'members/:username', component: MemberDetailComponent /*, resolve: { member: MemberDetailedResolver }*/ },
      //{ path: 'member/edit', component: MemberEditComponent , canDeactivate: [PreventUnsavedChangesGuard]},//if members/edit to avoid confilg with be4 we use pathMatch:full and move it up
      //{ path: 'lists', component: ListsComponent },
      //{ path: 'messages', component: MessagesComponent },
    //  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] }

    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//[RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
