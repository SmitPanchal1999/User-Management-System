import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-delete-button',
  templateUrl: './edit-delete-button.component.html',
  styleUrls: ['./edit-delete-button.component.css']
})
export class EditDeleteButtonComponent implements OnInit {
  data: any;
  params;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }
  agInit(params) {
    this.params = params;
    this.data = params.value
  }
  ngOnInit(): void {
  }
  editUser() {
    this.router.navigate(["./edit", this.params.data.id], { relativeTo: this.activatedRoute });
  }
  deleteUser() {
    this.userService.deleteUser(this.params.data.id)
      .subscribe((result) => {
        if (result["message"] == "success") {
          setTimeout(() => {
            this.router.navigateByUrl("/users");
          }, 800);
        }
        else if (result["message"] == "User does not exists") {
          alert("Invalid user");
        }
        else {
          alert("Database error please try again");
        }
      })
  }
}
