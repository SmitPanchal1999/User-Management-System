import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { UserTableComponent } from './user-table/user-table.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { EditDeleteButtonComponent } from './edit-delete-button/edit-delete-button.component';
import { StopPropogationDirective } from './stop-propogation.directive';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from "@angular/forms";
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { EditDeleteRoleComponent } from './edit-delete-role/edit-delete-role.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { EditRoleFormComponent } from './edit-role-form/edit-role-form.component';
import { LoginComponent } from './login/login.component';
import { SidebarForUserComponent } from './sidebar-for-user/sidebar-for-user.component';
import { PatternMatchTableComponent } from './pattern-match-table/pattern-match-table.component';
import { EditDeleteForUserComponent } from './edit-delete-for-user/edit-delete-for-user.component';
import { PatternDataEditFormComponent } from './pattern-data-edit-form/pattern-data-edit-form.component';
import { NameInitialComponent } from './name-initial/name-initial.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthGuard } from './auth.guard';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UserTableComponent,
    UserRoleComponent,
    EditDeleteButtonComponent,
    StopPropogationDirective,
    CreateUserFormComponent,
    EditUserFormComponent,
    EditDeleteRoleComponent,
    CreateRoleComponent,
    EditRoleFormComponent,
    LoginComponent,
    SidebarForUserComponent,
    PatternMatchTableComponent,
    EditDeleteForUserComponent,
    PatternDataEditFormComponent,
    NameInitialComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    AgGridModule.withComponents([]),
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthGuard],
  entryComponents: [EditDeleteButtonComponent,EditDeleteForUserComponent,EditDeleteRoleComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
