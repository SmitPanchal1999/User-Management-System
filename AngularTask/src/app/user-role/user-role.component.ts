import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { EditDeleteButtonComponent } from '../edit-delete-button/edit-delete-button.component';
import { EditDeleteRoleComponent } from '../edit-delete-role/edit-delete-role.component';
import { RoleService } from '../role.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit, AfterViewInit {
  paginationPageSize;
  domLayout = "autoHeight";
  roleData = [];
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
    { field: 'Roles', sortable: true,tooltipField:"Roles"},
    { field: 'description' },
    { field: "Actions", cellRendererFramework: EditDeleteRoleComponent }
  ];

  rowData = [{}];
  constructor(private roleService: RoleService, private activatedRoute: ActivatedRoute, private router: Router) { this.paginationPageSize = 5; }
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
  subcription: Subscription;
  onGridReady(params) {

    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    this.subcription = this.roleService
      .getRoles()
      .subscribe((data) => {
        data.forEach((d) => {
          this.roleData.push({
            id: d._id,
            Roles: d._source.roleName,
            description: d._source.description,
            modules: d._source.modules
          })
        })
        this.rowData = this.roleData;
        params.api.paginationGoToPage(1);
      });
  }
  createNewRole() {
    this.router.navigate(["./add"], { relativeTo: this.activatedRoute });
  }

  dataSource = new MatTableDataSource(this.rowData);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
