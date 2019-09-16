import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import {ShareService} from './share.service';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";

import {CookieService} from 'ngx-cookie-service';


import {CreateUserComponent} from './create-user/create-user.component';

import {UserSubpageComponent} from './user-subpage/user-subpage.component';
import {AddressSubpageComponent} from './address-subpage/address-subpage.component';
import {SummarySubpageComponent} from './summary-subpage/summary-subpage.component';

@NgModule({
	declarations: [CreateUserComponent, UserSubpageComponent, AddressSubpageComponent, SummarySubpageComponent],
	imports: [
		CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule
	],
	exports: [CreateUserComponent, UserSubpageComponent, AddressSubpageComponent],
	providers: [ShareService, CookieService]
})
export class CreateUserModule {}
