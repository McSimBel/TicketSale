import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public user: IUser | null;
  psw: string;
  newPsw: string;
  pswRepeat: string;
  login: string;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onChangePsw(ev: Event): void | boolean {
    console.log(this.user)

    if(this.user){
      if (this.psw === this.user.psw) {
        if(this.newPsw === this.pswRepeat) {
          window.localStorage.removeItem(this.user.login);
          this.user.psw = this.newPsw;
          this.userService.setUser(this.user);
          let userString = JSON.stringify(this.user);
          window.localStorage.setItem(this.user.login, userString);
          this.router.navigate(['auth']);
        } else {
          this.messageService.add({severity:'warn', summary:'Пароли не совпадают'})
        }
      } else {
        this.messageService.add({severity:'warn', summary:'Проверьте введеный пароль'})
      }
    }
  }
  return(ev: Event): void {
    this.router.navigate(['tickets/tickets-list']);
  }

}
