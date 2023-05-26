import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})

export class RestInterceptorsService implements HttpInterceptor {
  constructor(private userService: UserService) {

  }

  intercept (req: HttpRequest<any>,
             next: HttpHandler): Observable<HttpEvent<any>>{

    const hasToken = this.userService.getToken();

    if (hasToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + hasToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }

  }
}
