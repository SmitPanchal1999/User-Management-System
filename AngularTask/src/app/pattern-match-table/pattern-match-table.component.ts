import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditDeleteForUserComponent } from '../edit-delete-for-user/edit-delete-for-user.component';
import { ExternalDataService } from '../external-data.service';
import { RoleService } from '../role.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pattern-match-table',
  templateUrl: './pattern-match-table.component.html',
  styleUrls: ['./pattern-match-table.component.css']
})
export class PatternMatchTableComponent implements OnInit {
  paginationPageSize;
  patternMatchData = [];
  moduleName;
  overlayLoadingTemplate;
  domLayout = "autoHeight"; checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
  };
  headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
  };
  columnDefs = [
    {
      field: '',
      sortable: true,
      minWidth: 20,
      checkboxSelection: this.checkboxSelection,
      headerCheckboxSelection: this.headerCheckboxSelection,
    },
    { field: 'username', sortable: true,filter:true, tooltipField: "Roles" },
    { field: 'email', sortable: true,filter:true, tooltipField: "email" },
    { field: "website", sortable: true,filter:true, tooltipField: "website" },
    { field: "Actions", sortable: true, cellRendererFramework: EditDeleteForUserComponent }
  ];

  rowData = [{}];
  constructor(private externalDataService: ExternalDataService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private roleService: RoleService) {
    this.paginationPageSize = 5;
    this.moduleName = this.activatedRoute.snapshot.params['moduleName'];
    this.overlayLoadingTemplate ='<mat-spinner></mat-spinner>';
  }
  gridApi;
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }
  onPageSizeChanged() {
    const value = (<HTMLSelectElement>document.getElementById('page-size')).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  paginationSetPageSize(value) {
    this.paginationPageSize = value;
  }
  subcription: Subscription;
  userid;
  roles;
  moduleData;
  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }
  onBtHide() {
    this.gridApi.hideOverlay();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();

    console.log(this.moduleName);
    this.userid = sessionStorage.getItem("userid");
    this.userService.getUser(this.userid)
      .subscribe((result) => {
        this.roles = result._source.roles;
        console.log(this.roles);
        this.roleService.getModulesSync(this.roles)
          .subscribe((result) => {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              for (let j = 0; j < result[i]._source.modules.length; j++) {
                if (result[i]._source.modules[j].moduleName == this.moduleName) {
                  this.moduleData = result[i]._source.modules[j];
                  break;
                }
              }
            }
            console.log(this.moduleData);

            for (let i = 0; i < this.moduleData.privileges.length; i++) {
              for (let j = 0; j < this.moduleData.privileges[i].pattern.length; j++) {


                this.externalDataService.getPatternData(this.moduleData.privileges[i].pattern[j])
                  .subscribe((result) => {
                    for (let k = 0; k < result.length; k++) {



                      if (this.patternMatchData.map(function (e) { return e.id; }).indexOf(result[k]._id) == -1) {
                        this.patternMatchData.push({
                          id: result[k]._id,
                          username: result[k]._source.username,
                          email: result[k]._source.email,
                          website: result[k]._source.website,
                          privileges: this.moduleData.privileges[i].privilege
                        })
                      }
                    }
                    console.log(i, j, this.moduleData.privileges[i].pattern.length, this.moduleData.privileges.length)
                    console.log("patternmatch", this.patternMatchData);
                    if (this.moduleData.privileges.length - 1 == i && this.moduleData.privileges[i].pattern.length - 1 == j) {
                      setTimeout(() => {
                        
                      console.log("in")
                      this.rowData = this.patternMatchData;
                      console.log(this.rowData);
                      }, 500);
                    }


                  })
              }
            }


          })
      })
    params.api.paginationGoToPage(1);
    /*  this.subcription = this.roleService
       .getRoles()
       .subscribe((data) => {
         data.forEach((d) => {
           this.patternMatchData.push({
             id: d._id,
             Roles: d._source.roleName,
             description: d._source.description,
             modules: d._source.modules
           })
         })
         this.rowData = this.patternMatchData;
         params.api.paginationGoToPage(1);
       }); */
  }

  ngOnDestroy() {

  }

}
