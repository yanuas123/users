import {Component, OnInit} from '@angular/core';

import {HttpService} from '../../http.service';
import {ShareService} from '../share.service';

import {User, Address_} from '../../../user';
import {Mode_} from "../../create-user/modes";
import {SearchIconComponent} from "../../icons/search-icon/search-icon.component";

import {UserSubpageComponent} from '../../create-user/user-subpage/user-subpage.component';
import {AddressSubpageComponent} from '../../create-user/address-subpage/address-subpage.component';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss'],
	providers: [HttpService]
})
export class UserInfoComponent implements OnInit {
	show_search_form: boolean;

	users: User[];
	focus_user: string;
	focus_user_address: Address_[];

	form_mode: Mode_;
	user_form: boolean;
	user_data: User;
	address_form: boolean;
	address_data: Address_;


	constructor(private http: HttpService, private share: ShareService) {
		this.share.onFocus.subscribe((data: {address: Address_[], id: string}) => {
			this.focus_user_address = data.address;
			this.focus_user = data.id;
		});
		this.share.onChangeUser.subscribe((users: User[]) => this.users = users);

		this.show_search_form = false;


		this.share.onOpenUserForm.subscribe((data: {mode: Mode_, user_data: User}) => {
			this.form_mode = data.mode;
			this.user_form = true;
			this.user_data = data.user_data;
		});
		this.share.onOpenAddressForm.subscribe((data: {mode: Mode_, user_id: string, address_data?: Address_}) => {
			this.form_mode = data.mode;
			this.address_form = true;
			this.address_data = data.address_data;
		});
	}

	visibleSearchForm(v: boolean) {
		this.show_search_form = v;
	}

	ngOnInit() {
		this.http.getData().subscribe((data: User[]) => {
			if(data && data instanceof Array) this.users = data;
			else if(this.users! instanceof Array) this.users = null;
			this.share.initData(this.users);
		});
	}

}
