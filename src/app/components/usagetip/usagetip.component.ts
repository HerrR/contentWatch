import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-usagetip',
  templateUrl: './usagetip.component.html'
})
export class UsagetipComponent implements OnInit {
  @Input() tipData;
  trustedURL;
  constructor(private domSanitizer: DomSanitizer) {

  }

  // trustedURL(){
  //   console.log(this.tipData.link);
    
  //   return this.domSanitizer.bypassSecurityTrustResourceUrl(this.tipData.link);
  // }

  ngOnInit() {
    if(this.tipData.type == "tip"){
      this.trustedURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.tipData.link);
    }
    // console.log(this.tipData);
  }

}
