import { Component, OnDestroy, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditDeleteButtonComponent } from '../edit-delete-button/edit-delete-button.component';
import { NameInitialComponent } from '../name-initial/name-initial.component';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, AfterViewInit, OnDestroy {
  paginationPageSize;
  domLayout = "autoHeight";
  userData = [];
   overlayLoadingTemplate;
  checkboxSelection = function (params) {
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
    { field: 'username', sortable: true ,filter:true,cellRendererFramework:NameInitialComponent,tooltipField:"username" },
    { field: 'email', sortable: true,filter:true ,tooltipField:"email"},
    { field: "roles" ,tooltipField:"roles"}, 
    { field: "status" ,tooltipField:"status"}, 
    { field: "Actions", sortable: true, cellRendererFramework: EditDeleteButtonComponent }
  ];

  rowData = [{}];
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.paginationPageSize = 5;
    this.overlayLoadingTemplate ='<mat-spinner></mat-spinner>';
  }
  gridApi;
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }
  ngAfterViewInit() {

  }

  onPageSizeChanged() {
    const value = (<HTMLSelectElement>document.getElementById('page-size')).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }
  paginationSetPageSize(value) {
    this.paginationPageSize = value;
  }
  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }
  onBtHide() {
    this.gridApi.hideOverlay();
  }
  subcription: Subscription;
  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    this.subcription = this.userService
      .getUsers()
      .subscribe((data) => {
        data.forEach((d) => {
          this.userData.push({
            id: d._id,
            username: d._source.userName,
            email: d._source.email,
            status: d._source.status,
            roles: d._source.roles.toString()
          })
        })
        this.rowData = this.userData;
        console.log(this.rowData);
        params.api.paginationGoToPage(1);

      });
      
  }
  createNewUser() {
    this.router.navigate(["./add"], { relativeTo: this.activatedRoute });
  }
/* 
  dataSource = new MatTableDataSource(this.rowData);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 */
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
