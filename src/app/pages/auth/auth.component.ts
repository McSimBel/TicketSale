import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }
  isTabCaching: boolean = false;
  textProp: string = "Test";

  ngOnInit(): void {
  }
  changeProp() {
    const randIndex= Math.random();
    this.textProp = "newValue" + randIndex;
  }

}
