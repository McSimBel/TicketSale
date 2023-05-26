import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";

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
               private userService: UserService,
               private http: HttpClient) { }

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

      this.http.post<{access_token: string, id: string}>('http://127.0.0.1:3000/users/'+authUser.login, authUser).subscribe((data) => {
        authUser.id = data.id;
        this.userService.setUser(authUser);
        const token: string = data.access_token;
        this.userService.setToken(token);
        this.userService.setToStore(token);
        this.router.navigate(['tickets/tickets-list']);

      }, (err: HttpErrorResponse) => {
        const serverError = <ServerError>err.error;
        this.messageService.add({severity:'warn', summary:serverError.errorText});
      });
    // }

  }


}

