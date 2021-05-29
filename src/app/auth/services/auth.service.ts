import { Injectable } from '@angular/core';
import { UserLoginDTO } from '../models/user-login-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: UserLoginDTO): Promise<{ status: number }> {
    return new Promise((res) => {
      setTimeout(() => {
        if(user.email == 'wendryl10000@gmail.com' &&
          user.password == '123123'
        ) {
          res({ status: 200 });
        } else {
          res({ status: 401 });
        }
      }, 3000);
    });
  }
}
