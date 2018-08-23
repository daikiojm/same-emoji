import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmojiComponent, GameBoardComponent, LeaveConfirmDialogComponent } from './components';
import { MaterialModule } from './material/material.module';
import { GameLevelPageComponent, GameMainPageComponent, GameResultPageComponent, StartUpPageComponent } from './pages';
import { ToMinutesPipe } from './pipes';

const pageComponents = [StartUpPageComponent, GameLevelPageComponent, GameMainPageComponent, GameResultPageComponent];
const components = [GameBoardComponent, EmojiComponent, LeaveConfirmDialogComponent];
const pipes = [ToMinutesPipe];

@NgModule({
  entryComponents: [LeaveConfirmDialogComponent],
  declarations: [AppComponent, ...pageComponents, ...components, ...pipes],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
