import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Correct the property name to 'styleUrls' (with an 's')
})
export class AppComponent {
  showHomeLink: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHomeLink = !(event.url === '/' || event.url === '/home');
      }
    });
  }
}
