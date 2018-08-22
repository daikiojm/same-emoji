import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { routerTransition } from './animations';

@Component({
  selector: 'se-app-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  triggerAnimation(outlet: RouterOutlet): string {
    return outlet.isActivated ? outlet.activatedRouteData.animation : 'initial';
  }
}
