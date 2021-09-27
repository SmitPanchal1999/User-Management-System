import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  get formControls(): any {
    return this.loginForm.controls;
  }
  get email(){
    return this.loginForm.get("email");
  }
  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute,private roleService:RoleService) {
    console.log("url----",this.router.url);
   }
   getErrorMessage() {
    if (this.loginForm.get("email").hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.get("email").hasError('email') ? 'Not a valid email' : '';
  }
  roles=[];
  ngOnInit(): void {
  }
  onSubmit() {

    this.userService.checkUser(this.loginForm.value)
      .subscribe((user) => {
        console.log(user);
        
        if (user) {
          if (user.hasOwnProperty('_source')) {
            if (user._source.hasOwnProperty('admin')) {
              sessionStorage.setItem("admin", "true");
              sessionStorage.setItem("loggedIn", "true");
              this.router.navigate(["../users"])
                .then(() => {
                  window.location.reload();
                });
            }
            else {
              sessionStorage.setItem("admin", "false");
              sessionStorage.setItem("userid", user._id);
              sessionStorage.setItem("loggedIn", "true");
              
              this.userService.getUser(user._id)
                .subscribe((result) => {
                  this.roles = result._source.roles;
                  console.log(this.roles);
                  this.roleService.getModules(this.roles)

              .subscribe((result)=>{
                 console.log( this.roleService.getStaticModules())
                  this.router.navigate([`../products/${result[0]._source.modules[0].moduleName}`])
                .then(() => {
                  window.location.reload();
                });
              })
                })
              
              
            }
          }
          else {
            alert("invalid email password");
          }
        }
        else {
          alert("invalid email password")
        }
      })
  }
}
