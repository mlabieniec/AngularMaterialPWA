import { Component, OnInit } from "@angular/core";
import { MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  selector: "app-ios-install",
  templateUrl: "./ios-install.component.html",
  styleUrls: ["./ios-install.component.scss"]
})
export class IosInstallComponent implements OnInit {
  constructor(private snackBarRef: MatSnackBarRef<IosInstallComponent>) {}

  ngOnInit() {}

  close() {
    this.snackBarRef.dismiss();
  }
}
