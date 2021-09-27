import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExternalDataService } from '../external-data.service';

@Component({
  selector: 'app-pattern-data-edit-form',
  templateUrl: './pattern-data-edit-form.component.html',
  styleUrls: ['./pattern-data-edit-form.component.css']
})
export class PatternDataEditFormComponent implements OnInit {
  editDataForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl("", [Validators.required]),
    website:new FormControl("",[Validators.required])
  });
  id;
  user;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private externalDataService:ExternalDataService) { }
  getErrorMessage() {
    if (this.editDataForm.get("email").hasError('required')) {
      return 'You must enter a value';
    }

    return this.editDataForm.get("email").hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.externalDataService.getData(this.id)
    .subscribe((result)=>{
      this.user = result;
        this.editDataForm.patchValue({
          email: this.user._source.email,
          username: this.user._source.username,
          website:this.user._source.website
        })
    })
  }
  get username() {
    return this.editDataForm.get("username");
  }
  get website() {
    return this.editDataForm.get("website");
  }
  get email() {
    return this.editDataForm.get("email");
  }
  onSubmit(){
    console.log(this.editDataForm);
    const requestBody = {
      username: this.editDataForm.value.username,
      email: this.editDataForm.value.email,
      
      website: this.editDataForm.value.website,
      id: this.id
    }
console.log(requestBody);
    this.externalDataService.editData(JSON.stringify(requestBody)).subscribe((result) => {

      if (result["message"] == "success") {
        alert("successfully edited the user data");
        this.router.navigate(["../.."], { relativeTo: this.activatedRoute });
      }
      else {
        alert("Database error please try again");
      }
    });
  }
  cancel(){
    this.router.navigate(["../.."], { relativeTo: this.activatedRoute });
  }
}
