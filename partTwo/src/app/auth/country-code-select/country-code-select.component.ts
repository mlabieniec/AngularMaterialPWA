import { Component, OnInit } from "@angular/core";
import { CountryCode, CountryCodes } from "./country-codes";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-country-code-select",
  templateUrl: "./country-code-select.component.html",
  styleUrls: ["./country-code-select.component.scss"]
})
export class CountryCodeSelectComponent implements OnInit {
  countryCodes: Array<CountryCode> = CountryCodes;
  searchText: string;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<CountryCodeSelectComponent>
  ) {}

  ngOnInit() {}

  selectCountry(code: CountryCode) {
    this.bottomSheetRef.dismiss(code);
  }
}
