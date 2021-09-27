import { Component, OnInit } from '@angular/core';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { menuList } from '../menu-list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideMenu = menuList;
  collapse = false;

  toggleSidebar() {
    this.collapse = !this.collapse;
  }
  constructor(private router:Router) { 
    console.log("adminsidebar");
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
