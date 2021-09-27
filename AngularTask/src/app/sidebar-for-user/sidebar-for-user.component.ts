import { JsonpClientBackend } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidebar-for-user',
  templateUrl: './sidebar-for-user.component.html',
  styleUrls: ['./sidebar-for-user.component.css']
})
export class SidebarForUserComponent implements OnInit {
  sideMenu = [];
  collapse = false;
  roles = [];
  routes=[];
  id;
  constructor(private userService: UserService, private roleService: RoleService,private router:Router) {
    console.log("usersidebar");
    this.id = sessionStorage.getItem("userid");
    this.userService.getUser(this.id)
      .subscribe((result) => {
        this.roles = result._source.roles;
        console.log(this.roles);
        this.roleService.getModules(this.roles)
    .subscribe((result)=>{
        console.log(result);
      
        result.forEach(role => {
          role._source.modules.forEach(module => {
          
              let tempRoute='[../'+module.moduleName+"]";
            this.routes.push(tempRoute);
              
            this.sideMenu.push({ name:module.moduleName,icon:"list-alt"});
           
            
          });
        });
    })
      })
     /*  this.userService.getUser(this.id)
      .flatMap(() => this.someService.operation2(otherParameters))
      .subscribe(() => this.refreshPageMyFunction(),
        error => console.log(error)
      ); */
    /*  this.userService.getUser(this.id) // returns an Observable of type X
        .flatMap((res: X) => {
           // returns an Observable of type Y
        })
        .flatMap((res: Y) => {
           // returns an Observable of type Z
        })
        .flatMap((res: Z) => {
           // returns an Observable of type Q
        })
        .subscribe((res: Q) => {
           // some logic
        }); */
      /* this.userService.getUser(this.id)
      .flatMap(() => this.someService.operation2(otherParameters))
      .subscribe(() => this.refreshPageMyFunction(),
        error => console.log(error)
      ); */
    
    
  }
  toggleSidebar() {
    this.collapse = !this.collapse;
  }
  ngOnInit(): void {
  }
  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl("/login")
    .then(() => {
      window.location.reload();
    });

  }

}
