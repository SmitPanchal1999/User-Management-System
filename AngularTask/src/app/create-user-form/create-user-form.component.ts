import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {
  hidePassword = true;
  hideConfirm = true;

  roleList = [];

  newUserForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl("", [Validators.required]),
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),
    confirmpassword: new FormControl("", [Validators.required, Validators.minLength(4)]),
    rolesControl: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required])
  });
  constructor(private userService: UserService, private roleService: RoleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.roleService.getRoles()
      .subscribe((result) => {
        result.forEach((role) => {
          this.roleList.push(role._source.roleName);
        })
      })
  }
  get rolesControl() {
    return this.newUserForm.get("rolesControl");
  }
  get username() {
    return this.newUserForm.get("username");
  }
  get firstname() {
    return this.newUserForm.get("firstname");
  }
  get lastname() {
    return this.newUserForm.get("lastname");
  }
  get password() {
    return this.newUserForm.get("password");
  }
  get confirmpassword() {
    return this.newUserForm.get("confirmpassword");
  }
  get email() {
    return this.newUserForm.get("email");
  }
  get status() {

    return this.newUserForm.get("status");
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.newUserForm.get("email").hasError('required')) {
      return 'You must enter a value';
    }

    return this.newUserForm.get("email").hasError('email') ? 'Not a valid email' : '';
  }
  onSubmit() {
    if (this.newUserForm.value.confirmpassword !== this.newUserForm.value.password) {
      const passmsg = document.getElementById("passNotMatch");
      passmsg.innerHTML = "Confirm-password does not match";
    }
    else {
      const passmsg = document.getElementById("passNotMatch");
      passmsg.innerHTML = "";
      const requestBody = {
        userName: this.newUserForm.value.username,
        firstName: this.newUserForm.value.firstname,
        lastName: this.newUserForm.value.lastname,
        status: this.newUserForm.value.status,
        roles: this.newUserForm.value.rolesControl,
        email: this.newUserForm.value.email,
        password: this.newUserForm.value.password
      }
      this.userService.addUser(requestBody)
        .subscribe((result) => {
          if (result["message"] == "success") {
            alert("Successfully Added New User");
            this.router.navigate(["../"], { relativeTo: this.activatedRoute });
          }
          else if (result["message"] == "exists") {
            alert("Email already exists");
          }
          else {
            alert("Database error please try again :(");
          }
        })
    }
  }
  onRoleRemoved(role: string) {
    const roles = this.rolesControl.value as string[];
    this.removeFirst(roles, role);
    this.rolesControl.setValue([""]);
    this.rolesControl.setValue(roles); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
