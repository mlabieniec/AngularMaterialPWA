import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  OnInit
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IosInstallComponent } from "./ios-install/ios-install.component";
import { AuthService } from "./auth/auth.service";
import Auth from "@aws-amplify/auth";
import Storage from "@aws-amplify/storage";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Material PWA";
  mobileQuery: MediaQueryList;
  nav = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "My Account (Part 2)",
      path: "/auth/signin"
    }
  ];
  avatar: string;
  private _mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public auth: AuthService,
    private toast: MatSnackBar
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    auth.authState.subscribe((event: string) => {
      if (event === AuthService.SIGN_IN) this.checkSession();
      if (event === AuthService.SIGN_OUT) this.avatar = undefined;
    });
  }

  ngOnInit() {
    this.detectIOS();
    this.checkSession();
  }

  async checkSession() {
    try {
      const userInfo = await Auth.currentUserInfo();
      if (userInfo && userInfo.attributes.profile) {
        const avatar = userInfo.attributes.profile;
        const url = (await Storage.vault.get(avatar)) as string;
        this.avatar = url;
      }
    } catch (error) {
      console.log("no session: ", error);
    }
  }

  detectIOS() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      "standalone" in (window as any).navigator &&
      (window as any).navigator.standalone;

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      setTimeout(() => {
        this.toast.openFromComponent(IosInstallComponent, {
          duration: 8000,
          horizontalPosition: "start",
          panelClass: ["mat-elevation-z3"]
        });
      });
    }
  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }
}
