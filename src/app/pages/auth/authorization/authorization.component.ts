import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy, OnChanges {
  @Input() inputProp ='test';

  loginText: string = 'Логин';
  pswText: string = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  showCardNumber: boolean;




  constructor (private messageService: MessageService,
               private authService: AuthService,
               private router: Router,
               private route: ActivatedRoute,
               private userService: UserService) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
    this.showCardNumber = ConfigService.config.useUserCard;
  }
  ngOnDestroy(): void {
  }

  ngOnChanges(changes:SimpleChanges): void {
  }

  vipStatusSelected(): void {}

  onAuth(ev: Event): void | boolean {

    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }

    if (this.authService.checkUser(authUser)) {
      this.userService.setUser(authUser);
      this.userService.setToken(this.login);

      this.router.navigate(['tickets/tickets-list']);
    } else {
      console.log('auth false');
      this.messageService.add({severity:'warn', summary:'Проверьте имя пользователя или пароль'});
    }
  }


}

