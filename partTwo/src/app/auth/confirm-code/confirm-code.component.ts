import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {

  email = environment.confirm.email;
  confirmForm: FormGroup = new FormGroup({
    email: new FormControl({value: this.email, disabled: true}),
    code: new FormControl('', [ Validators.required, Validators.min(3) ])
  });
  
  get codeInput() { return this.confirmForm.get('code'); }

  constructor( private _router: Router, private _notification: NotificationService ) { }

  ngOnInit() {
    if (!this.email) {
      this._router.navigate(['auth/signup']);
    } else {
      Auth.resendSignUp(this.email);
    }
  }

  sendAgain() {
    Auth.resendSignUp(this.email)
      .then(() => this._notification.show('A code has been emailed to you'))
      .catch(() => this._notification.show('An error occurred'));
  }

  confirmCode() {
    Auth.confirmSignUp(this.email, this.codeInput.value)
      .then((data: any) => {
        console.log(data);
        if (data === 'SUCCESS' &&
            environment.confirm.email && 
            environment.confirm.password) {
          Auth.signIn(this.email, environment.confirm.password)
            .then(() => {
              this._router.navigate(['']);
            }).catch((error: any) => {
              this._router.navigate(['auth/signin']);
            })
        }
      })
      .catch((error: any) => {
        console.log(error);
        this._notification.show(error.message);
      })
  }

}
