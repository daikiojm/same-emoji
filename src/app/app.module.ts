import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmojiComponent, GameBoardComponent } from './components';
import { MaterialModule } from './material/material.module';
import { GameLevelPageComponent, GameMainPageComponent, GameResultPageComponent, StartUpPageComponent } from './pages';
import { ToMinutesPipe } from './pipes';
import { GameService, TimerService } from './services';

const pageComponents = [StartUpPageComponent, GameLevelPageComponent, GameMainPageComponent, GameResultPageComponent];
const components = [GameBoardComponent, EmojiComponent];
const services = [GameService, TimerService];
const pipes = [ToMinutesPipe];

@NgModule({
  declarations: [AppComponent, ...pageComponents, ...components, ...pipes],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [...services, ...pipes],
  bootstrap: [AppComponent],
})
export class AppModule {}
