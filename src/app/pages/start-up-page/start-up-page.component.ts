import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'se-start-up-page',
  templateUrl: './start-up-page.component.html',
  styleUrls: ['./start-up-page.component.scss'],
})
export class StartUpPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onClickStart(): void {
    this.router.navigate(['/play']);
  }
}
