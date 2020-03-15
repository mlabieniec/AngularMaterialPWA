import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { NotificationService } from 'src/app/services/notification.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.email ]),
    phone: new FormControl('', [ Validators.min(10) ]),
    fname: new FormControl('', [ Validators.min(2) ]),
    lname: new FormControl('', [ Validators.min(2) ])
  });
  currentAvatarUrl: string;
  avatar: string;
  deleteAvatar = false;
  profile:any = {};
  user: CognitoUser;
  
  get emailInput() { return this.profileForm.get('email'); }
  get fnameInput() { return this.profileForm.get('fname'); }
  get lnameInput() { return this.profileForm.get('lname'); }
  get phoneInput() { return this.profileForm.get('phone'); }

  constructor( 
    private _authService: AuthService,
    private _router: Router,
    private _notification: NotificationService,
    public loading: LoaderService ) { }

  ngOnInit() {
    this.loading.show();
    this.getUserInfo();
  }

  async getUserInfo() {
    this.profile = await Auth.currentUserInfo();
    this.user = await Auth.currentAuthenticatedUser();
    if ( this.profile.attributes['profile'] ) {
      this.avatar = this.profile.attributes['profile'];
      this.currentAvatarUrl = await Storage.vault.get(this.avatar) as string;
    }
    this.fnameInput.setValue(this.profile.attributes['given_name']);
    this.lnameInput.setValue(this.profile.attributes['family_name']);
    this.phoneInput.setValue(this.profile.attributes['phone_number']);
    this.loading.hide();
  }

  getEmailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }

  signOut() {
    this._authService.signOut()
      .then(() => this._router.navigate(['auth/signin']))
  }

  onAvatarUploadComplete(data: any) {
    this.avatar = data.key;
    this.loading.hide();
  }

  onAvatarRemove() {
    this.avatar = undefined;
    this.currentAvatarUrl = undefined;
    this.deleteAvatar = true;
  }

  async editProfile() {
    try {
      let attributes = {
        'given_name': this.fnameInput.value,
        'family_name': this.lnameInput.value,
        'phone_number': this.phoneInput.value
      };
      if (this.avatar) {
        attributes['profile'] = this.avatar;
      }
      await Auth.updateUserAttributes(this.user,attributes);
      if (!this.avatar && this.deleteAvatar) {
        this.user.deleteAttributes(["profile"],(error) => {
          if (error) console.log(error);
          this._notification.show('Your profile information has been updated.');
        });
      } else {
        this._notification.show('Your profile information has been updated.');
      }
    } catch (error) {
      console.log(error);
    }
  }

}
