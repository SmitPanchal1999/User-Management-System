import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { RoleService } from '../role.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  privilegesList = ["read", "update", "delete"];
  newRoleForm;
  constructor(private fb: FormBuilder, private roleService: RoleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.newRoleForm = this.fb.group({

      roleName: ['', [Validators.required]],
      description: ["", []],
      modules: this.fb.array([])
    });
  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  modules(): FormArray {

    return this.newRoleForm.get("modules") as FormArray
  }
  newModule(): FormGroup {
    return this.fb.group({
      moduleName: "",
      privileges: this.fb.array([])
    })
  }
  privileges(index: number) {
    return this.modules().at(index).get("privileges") as FormArray
  }

  newPrivileges(): FormGroup {
    return this.fb.group({
      pattern: ['', [Validators.required]],
      privilege: new FormControl("", [Validators.required]),
    })
  }
  ngOnInit(): void {
  }
  addModule() {
    this.modules().push(this.newModule());
    this.addPrivilege(this.newRoleForm.get("modules").value.length - 1);
  }

  removeModule(i: number) {
    this.modules().removeAt(i);
  }
  addPrivilege(index: number) {
    this.privileges(index).push(this.newPrivileges());

  }
  removePrivilege(moduleindex: number, privilegeindex: number) {
    this.privileges(moduleindex).removeAt(privilegeindex);
  }


  onRoleRemoved(role: string, i: number, j: number) {
    let temp = <FormGroup>this.privileges(i).controls[j];
    console.log(temp.controls["privilege"]);

    const roles = temp.controls["privilege"].value as string[];
    this.removeFirst(roles, role);
    temp.controls["privilege"].setValue([""]);
    temp.controls["privilege"].setValue(roles); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  addPattern(event: MatChipInputEvent, i, j): void {
    const input = event.input;
    const value = event.value;

    let temp = <FormGroup>this.privileges(i).controls[j];
    console.log(temp.controls["pattern"]);
    let roles;

    if (temp.controls["pattern"].value == "") {
      roles = []

    }
    else {
      roles = temp.controls["pattern"].value as string[];

    }
    // Add our fruit
    if ((value || '').trim()) {
      roles.push(value.trim());
      temp.controls["pattern"].setValue(roles);

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removePattern(pattern, i, j): void {

    let temp = <FormGroup>this.privileges(i).controls[j];
    console.log(temp.controls["pattern"]);
    let roles = temp.controls["pattern"].value as string[];
    const index = roles.indexOf(pattern);

    if (index >= 0) {
      roles.splice(index, 1);

      temp.controls["pattern"].setValue([""]);
      temp.controls["pattern"].setValue(roles);
    }
  }
  onSubmit() {
    let role = {
      "description": this.newRoleForm.value.description,
      "roleName": this.newRoleForm.value.roleName,
      "modules": this.newRoleForm.value.modules
    }
    let flag = 0;
    for (let i = 0; i < this.newRoleForm.value.modules.length; i++) {
      this.roleService.createModuleExists(this.newRoleForm.value.modules[i].moduleName)

        .subscribe((result) => {
          console.log(result);
          if (result["message"] == "exists") {
            flag = 1;
            alert(this.newRoleForm.value.modules[i].moduleName + " exists");
            return false;
            
          }
        })
    }
    console.log(flag);
    setTimeout(()=>{
      if (flag == 0) {


        this.roleService.addRole(role)
          .subscribe((result) => {
  
            console.log(result);
            if (result["message"] == "success") {
              alert("successfully added new role");
              this.router.navigate(["../"], { relativeTo: this.activatedRoute });
            } else if (result["message"] == "exists") {
              alert("Role already exists");
            }
            else {
              alert("Database error please try again :(");
            }
          })
  
      }
    },800)
    
  }

}
