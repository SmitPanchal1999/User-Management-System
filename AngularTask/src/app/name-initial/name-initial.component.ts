import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-initial',
  templateUrl: './name-initial.component.html',
  styleUrls: ['./name-initial.component.css']
})
export class NameInitialComponent implements OnInit {

  showInitial;
  params: any = {};
  count = 0;
  constructor() { }
  agInit(params) {

    if (params.data.hasOwnProperty("username")) {
      this.params.name = params.data.username;

    }


  }
  ngOnInit(): void {
  }
  getRandomColor = () => {
    return '#' + Math.floor(0x1000000 * Math.random()).toString(16);
  }

  getInitials = (name) => {
    console.log(name);
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    canvas.width = 30;
    canvas.height = 30;
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
    context.fillStyle = this.getRandomColor();
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '16px Arial';
    context.fillStyle = '#FFFFFF';
    const nameArray = name.split(' ');

    let initials = '';
    for (let i = 0; i < nameArray.length; i++) {
      if (i <= 1) initials += nameArray[i][0];
    }
    if (initials.length > 1) {
      context.fillText(initials.toUpperCase(), 3, 15);
    } else {
      context.fillText(initials.toUpperCase(), 10, 15);
    }
    const data = canvas.toDataURL();
    document.body.removeChild(canvas);
    return data;
  }
}
