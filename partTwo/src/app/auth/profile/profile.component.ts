import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor( 
    private _authService: AuthService,
    private _router: Router ) { }

  ngOnInit() {
  }

  signOut() {
    this._authService.signOut()
      .then(() => this._router.navigate(['auth/signin']))
  }

}
