import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularTask';

  admin = JSON.parse( sessionStorage.getItem('admin'));
  loggedIn = JSON.parse(sessionStorage.getItem("loggedIn"));
  
}
