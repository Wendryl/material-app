import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserLoginDTO {

  id: number | undefined;
  email: string | undefined;
  password: string | undefined;

}
