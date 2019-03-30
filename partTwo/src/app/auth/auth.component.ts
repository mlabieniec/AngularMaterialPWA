import { Component, OnInit } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor( private _router: Router ) { }

  ngOnInit() {
    Auth.currentAuthenticatedUser()
      .then(() => {
        this._router.navigate(['auth/profile']);
        return false;
      })
      .catch(() => {
        return true;
      });
  }

}
