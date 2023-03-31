import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersStorage: IUser [] = [];

  constructor() { }

  checkUser(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);

    let isUserInLocalStorage = window.localStorage.getItem(user.login);
    let userInStorage: IUser = <IUser>{};
    if (isUserInLocalStorage) {
      userInStorage = JSON.parse(isUserInLocalStorage);
    }

    if (isUserExists) {
      return isUserExists.psw === user.psw;
    } else if(userInStorage?.login) {
      return userInStorage.psw === user.psw;
    }
    return false;
  }
  setUser(user: IUser): void {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    if (!isUserExists && user?.login) {
      this.usersStorage.push(user)
    }
  }
  isUserExists(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);

    return !!isUserExists;
  }


}
