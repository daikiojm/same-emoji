import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartUpPageComponent, GameMainPageComponent, GameResultPageComponent } from './pages';

const pageComponents = [
  StartUpPageComponent,
  GameMainPageComponent,
  GameResultPageComponent,
];

const components = [];

const services = [];

@NgModule({
  declarations: [AppComponent, ...pageComponents, ...components, GameResultPageComponent, GameMainPageComponent, StartUpPageComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
