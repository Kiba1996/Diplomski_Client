import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(public auth: AuthenticationService, private elementRef: ElementRef){
    
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2e2e28';
 }
  title = 'client';
}
