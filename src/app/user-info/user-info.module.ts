import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import {ShareService} from './share.service';

import {SearchFormComponent} from './search-form/search-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {AddressListComponent} from './address-list/address-list.component';

import {UserInfoComponent} from './user-info/user-info.component';
import {CreateUserModule} from "../create-user/create-user.module";

import {SearchIconComponent} from '../icons/search-icon/search-icon.component';

@NgModule({
	declarations: [SearchFormComponent, UserListComponent, AddressListComponent, UserInfoComponent, SearchIconComponent],
	imports: [
		CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, CreateUserModule
	],
	exports: [UserInfoComponent],
	providers: [ShareService]
})
export class UserInfoModule {}
