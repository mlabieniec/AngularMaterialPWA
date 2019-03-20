import { Injectable } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { Subject, Observable } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';

export interface NewUser {
  email: string,
  phone: string,
  password: string,
  firstName: string,
  lastName: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public loggedIn: boolean;
  private _authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();
  authState: Observable<CognitoUser|any> = this._authState.asObservable();

  constructor() { }
  
  signUp(user: NewUser): Promise<CognitoUser|any> {
    return Auth.signUp({
      "username": user.email,
      "password": user.password,
      "attributes": {
        "email": user.email,
        "given_name": user.firstName,
        "family_name": user.lastName,
        "phone_number": user.phone
      }
    });
  }

  signIn(username: string, password: string):Promise<CognitoUser|any> {
    return new Promise((resolve,reject) => {
      Auth.signIn(username,password)
      .then((user: CognitoUser|any) => {
        this.loggedIn = true;
        resolve(user);
      }).catch((error: any) => reject(error));
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false)
  }

}
