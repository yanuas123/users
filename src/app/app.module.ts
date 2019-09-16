import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import {HttpService} from './http.service';
import {AppRoutingModule} from './app-routing.module';

import {UserInfoModule} from "./user-info/user-info.module";
import {CreateUserModule} from "./create-user/create-user.module";

import {HeaderComponent} from './app-child-components/header/header.component';
import {FooterComponent} from './app-child-components/footer/footer.component';
import {MainComponent} from './app-child-components/main/main.component';

import {MainPageComponent} from './app-child-components/main-page/main-page.component';
import {MenuComponent} from './app-child-components/menu/menu.component';

import {AppComponent} from './app.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		MainComponent,
		MainPageComponent,
		MenuComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		UserInfoModule,
		CreateUserModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [HttpService],
	bootstrap: [AppComponent]
})
export class AppModule {}
