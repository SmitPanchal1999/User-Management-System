import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-delete-for-user',
  templateUrl: './edit-delete-for-user.component.html',
  styleUrls: ['./edit-delete-for-user.component.css']
})
export class EditDeleteForUserComponent implements OnInit {
  showEdit=false;
  showDelete=false;
  params;
  data;
  constructor(private router:Router,private activatedRoute:ActivatedRoute ) { }
  agInit(params) {
    this.params = params;
    console.log("aginit ",this.params);
    if(this.params.data.hasOwnProperty("privileges")){

    
    if (this.params.data.privileges.indexOf("update")!==-1){
      this.showEdit=true;

    }
    if (this.params.data.privileges.indexOf("delete")!==-1){
      this.showDelete=true;

    }
  }
  }
  ngOnInit(): void {
  }
  editData() {
    console.log(this.params.data);
    this.router.navigate(["./edit", this.params.data.id], { relativeTo: this.activatedRoute });
  }
  deleteData() {
    /* this.roleService.deleteRole(this.params.data.id)
      .subscribe((result) => {

        if (result["message"] == "success") {
          setTimeout(() => {
            this.router.navigateByUrl("/roles");
          }, 800);

        }
        else if (result["message"] == "Role does not exists") {
          alert("Invalid user");
        }
        else {
          alert("Database error please try again");
        }
      }) */
  }
}
