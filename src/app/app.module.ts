import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartUpPageComponent, GameMainPageComponent, GameResultPageComponent } from './pages';
import { GameBoardComponent, EmojiComponent } from './components';
import { GameService, TimerService } from './services';
import { ToMinutesPipe } from './pipes';

const pageComponents = [StartUpPageComponent, GameMainPageComponent, GameResultPageComponent];
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
