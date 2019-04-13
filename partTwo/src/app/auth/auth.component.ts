import { Component, OnInit, NgZone } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { Hub } from '@aws-amplify/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor( private _router: Router, private _zone: NgZone ) { }

  ngOnInit() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this._zone.run(() => {
            this._router.navigate(['/']);
          });
          break;
        case "signOut":
          this._zone.run(() => {
            this._router.navigate(['/auth/signin']);
          });
          break;
      }
    });
    Auth.currentAuthenticatedUser()
      .then(() => {
        this._router.navigate(['auth/profile']);
      })
      .catch(() => {});
  }

}
