import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | null;
  private token: string  | undefined;
  constructor() { }

  getUser(): IUser | null {
      return this.user;
  };
  setUser(user: IUser): void {
    this.user = user;
  };
  setToken(token: string): void {
    this.token = token;
  }

  setToStore(token: string): void {
    window.localStorage.setItem('ticketsTour-token', token)
  }

  getToken(): string | void  {
    if (this.token) {
      return this.token;
    } else {
      const isTokenInStorage = window.localStorage.getItem('ticketsTour-token');
      if (isTokenInStorage) {
        return isTokenInStorage;
      }
    }
  }
  deleteUser(){
    this.user = null;
    this.token = '';
    window.localStorage.setItem('ticketsTour-token', this.token);
  }
}
