import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartUpPageComponent, GameMainPageComponent, GameResultPageComponent } from './pages';
import { GameBoardComponent, EmojiComponent } from './components';
import { GameService } from './services/game.service';

const pageComponents = [
  StartUpPageComponent,
  GameMainPageComponent,
  GameResultPageComponent,
];

const components = [
  GameBoardComponent,
  EmojiComponent,
];

const services = [
  GameService,
];

@NgModule({
  declarations: [AppComponent, ...pageComponents, ...components],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
