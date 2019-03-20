import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  message = "Please wait...";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      if (data.message)
        this.message = data.message;
    }

  ngOnInit() {
  }

}
