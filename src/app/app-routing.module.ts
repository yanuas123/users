import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {UserInfoModule} from "./user-info/user-info.module";
import {CreateUserModule} from "./create-user/create-user.module";
import {MainPageComponent} from './app-child-components/main-page/main-page.component';

import {UserInfoComponent} from './user-info/user-info/user-info.component';
import {CreateUserComponent} from './create-user/create-user/create-user.component';

const routes: Routes = [{
	path: "", component: MainPageComponent
}, {
	path: "users", component: UserInfoComponent
}, {
	path: "create-user", component: CreateUserComponent
	}];

@NgModule({
	imports: [RouterModule.forRoot(routes), FormsModule],
	exports: [RouterModule]
})
export class AppRoutingModule {}
