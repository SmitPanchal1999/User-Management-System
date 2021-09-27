import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {
  hidePassword = true;
  hideConfirm = true;
  roleList = [];
  newUserForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl("", [Validators.required]),
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirmpassword: new FormControl("", [Validators.required]),
    rolesControl: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required])
  });
  id;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private roleService: RoleService) {
    this.roleService.getRoles()
      .subscribe((result) => {
        result.forEach((role) => {
          this.roleList.push(role._source.roleName);
        })
      })
  }
  user: any;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.id)
      .subscribe((data) => {
        this.user = data;
        this.newUserForm.patchValue({
          email: this.user._source.email,
          username: this.user._source.userName,
          firstname: this.user._source.firstName,
          lastname: this.user._source.lastName,
          password: this.user._source.password,
          confirmpassword: this.user._source.password,
          rolesControl: this.user._source.roles,
          status: this.user._source.status
        })

      });
  }

  get rolesControl() {
    return this.newUserForm.get("rolesControl");
  }
  get status() {
    return this.newUserForm.get("status");
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
      const requestBody = {
        userName: this.newUserForm.value.username,
        firstName: this.newUserForm.value.firstname,
        lastName: this.newUserForm.value.lastname,
        status: this.newUserForm.value.status,
        roles: this.newUserForm.value.rolesControl,
        email: this.newUserForm.value.email,
        password: this.newUserForm.value.password,
        id: this.id
      }
      const passmsg = document.getElementById("passNotMatch");
      passmsg.innerHTML = "";

      this.userService.editUser(requestBody).subscribe((result) => {

        if (result["message"] == "success") {
          alert("successfully edited the user data");
          this.router.navigate(["../.."], { relativeTo: this.activatedRoute });
        }
        else {
          alert("Database error please try again");
        }
      });
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
