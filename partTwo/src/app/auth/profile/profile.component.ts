import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.email, Validators.required ]),
    phone: new FormControl('', [ Validators.min(10) ]),
    fname: new FormControl('', [ Validators.min(2) ]),
    lname: new FormControl('', [ Validators.min(2) ])
  });
  currentAvatarUrl: string;
  avatar: string;
  deleteAvatar = false;
  currentAttributes:any = {};
  currentUser: CognitoUser;
  loading = true;
  
  get emailInput() { return this.profileForm.get('email'); }
  get fnameInput() { return this.profileForm.get('fname'); }
  get lnameInput() { return this.profileForm.get('lname'); }
  get phoneInput() { return this.profileForm.get('phone'); }

  constructor( 
    private _authService: AuthService,
    private _router: Router,
    private _notification: NotificationService ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    this.currentAttributes = await Auth.currentUserInfo();
    this.currentUser = await Auth.currentAuthenticatedUser();
    console.log('attributes: ', this.currentAttributes);
    if ( this.currentAttributes.attributes['custom:picture'] ) {
      this.avatar = this.currentAttributes.attributes['custom:picture'];
      this.currentAvatarUrl = await Storage.vault.get(this.avatar) as string;
    }
    this.fnameInput.setValue(this.currentAttributes.attributes['given_name']);
    this.lnameInput.setValue(this.currentAttributes.attributes['family_name']);
    this.phoneInput.setValue(this.currentAttributes.attributes['phone_number']);
    this.loading = false;
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
    this.loading = false;
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
      await Auth.updateUserAttributes(
        this.currentUser,
        attributes
      );
      if (!this.avatar && this.deleteAvatar) {
        this.currentUser.deleteAttributes(["profile"],(error) => {
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
