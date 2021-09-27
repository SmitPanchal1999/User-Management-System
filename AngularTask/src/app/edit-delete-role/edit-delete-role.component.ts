import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-edit-delete-role',
  templateUrl: './edit-delete-role.component.html',
  styleUrls: ['./edit-delete-role.component.css']
})
export class EditDeleteRoleComponent implements OnInit {
  data: any;
  params;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private roleService: RoleService) { }
  agInit(params) {
    this.params = params;
    this.data = params.value
  }
  ngOnInit(): void {
  }
  editRole() {
    this.router.navigate(["./edit", this.params.data.id], { relativeTo: this.activatedRoute });
  }
  deleteRole() {
    this.roleService.deleteRole(this.params.data.id)
      .subscribe((result) => {

        if (result["message"] == "success") {
          setTimeout(() => {
            this.router.navigateByUrl("/roles");
          }, 500);

        }
        else if (result["message"] == "Role does not exists") {
          alert("Invalid user");
        }
        else {
          alert("Database error please try again");
        }
      })
  }
}
