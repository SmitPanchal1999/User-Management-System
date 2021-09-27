import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateRoleComponent } from './create-role/create-role.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { EditRoleFormComponent } from './edit-role-form/edit-role-form.component';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { PatternDataEditFormComponent } from './pattern-data-edit-form/pattern-data-edit-form.component';
import { PatternMatchTableComponent } from './pattern-match-table/pattern-match-table.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent,canActivate:[LoginGuard] },
  { path:"products/:moduleName/edit/:id",component:PatternDataEditFormComponent,canActivate: [UserGuard] },
  { path:"products/:moduleName",component:PatternMatchTableComponent,canActivate: [UserGuard] },
  { path:"products",component:PatternMatchTableComponent,canActivate: [UserGuard]},
 

  { path: "users" , data: {
    breadcrumb: 'Users',
  },children:[{
    path:"",
    component:UserTableComponent,canActivate:[AuthGuard]
  },
{
  path:"add",data:{
    breadcrumb:"Add"
  },
  component:CreateUserFormComponent,canActivate:[AuthGuard]
},{
  path:"edit",
  
  children:[{
    path:":id",
    data:{
      breadcrumb:"Edit"
    },
    component:EditUserFormComponent,canActivate:[AuthGuard]
  }]

}]},
{ path: "roles" , data: {
  breadcrumb: 'Roles',
},children:[{
  path:"",
  component:UserRoleComponent,canActivate:[AuthGuard]
},
{
path:"add",data:{
  breadcrumb:"Add"
},
component:CreateRoleComponent,canActivate:[AuthGuard]
},{
path:"edit",

children:[{
  path:":id",
  data:{
    breadcrumb:"Edit"
  },
  component:EditRoleFormComponent,canActivate:[AuthGuard]
}]

}]},
/* 
  { path: "users/add", component: CreateUserFormComponent ,canActivate: [AuthGuard]}, */
  /* { path: "users", component: UserTableComponent ,canActivate: [AuthGuard]}, */
  /* { path: "roles/edit/:id", component: EditRoleFormComponent,canActivate: [AuthGuard] },
  { path: "roles/add", component: CreateRoleComponent ,canActivate: [AuthGuard]},
  { path: "roles", component: UserRoleComponent ,canActivate: [AuthGuard]}, */
  
  { path:"**",redirectTo:"/login",pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
