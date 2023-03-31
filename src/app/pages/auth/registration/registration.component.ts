import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login:string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  selectedValue: boolean;

  constructor(private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }
  toLocalStorage(): void{}
  registration(ev: Event): void | boolean {
    if (this.psw !== this.pswRepeat){
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
      return false;
    }
    const userObj: IUser = {
      login: this.login,
      psw: this.psw,
      cardNumber: this.cardNumber,
      email: this.email
    }
    if (!this.authService.isUserExists(userObj)) {
      if (this.selectedValue){
      let userString = JSON.stringify(userObj);
      window.localStorage.setItem(this.login, userString)}
      this.authService.setUser(userObj);
      this.messageService.add({severity:'success',
        summary:'Вы успешно зарегистрированы'});
    } else {
      this.messageService.add({severity:'warn', summary:'Пользователь с таким логином уже зарегестрирован'});
    }

  }

}
