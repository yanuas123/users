import {Injectable, EventEmitter} from '@angular/core';

import {HttpService} from '../http.service';

import {User, Address_} from '../../user';
import {Mode_} from "../create-user/modes";
import {SearchForm} from './search-form/search-form.component';

@Injectable()
export class ShareService {
	users: User[];
	filter_data: SearchForm;
	filter_users: User[];
	focus_user: string;
	focus_user_address: Address_[];

	constructor(private http: HttpService) {}
	onFocus: EventEmitter<{address: Address_[], id: string}> = new EventEmitter();
	onChangeUser: EventEmitter<User[]> = new EventEmitter();
	onOpenUserForm: EventEmitter<{mode: Mode_, user_data: User}> = new EventEmitter();
	onOpenAddressForm: EventEmitter<{mode: Mode_, user_id: string, address_data?: Address_}> = new EventEmitter();

	public doFocus(id: string) {
		this.focus_user = id;
		if(this.users && this.focus_user) this.users.forEach((el, i) => {
			if(el._id == this.focus_user) this.focus_user_address = el.address;
		});
		else this.focus_user_address = null;

		this.onFocus.emit({address: this.focus_user_address, id: this.focus_user});
	}

	public doFilter(data?: SearchForm) {
		if(data) this.filter_data = data;
		else data = this.filter_data;
		let filter_users: User[];

		filter_users = this.users.filter((user) => {
			let match: boolean = true;
			for(let key in data) {
				let descriptor = Object.getOwnPropertyDescriptor(data, key);
				if(descriptor) descriptor = descriptor.value;
				let user_value = Object.getOwnPropertyDescriptor(user, key);
				if(user_value) user_value = user_value.value;
				if(descriptor && !(new RegExp(<string> descriptor, "i").test(<string> user_value))) match = false;
			}
			return match;
		});
		this.onChangeUser.emit(filter_users);
		this.filter_users = filter_users;
	}


	deleteUser(id: string) {
		let callback = () => {
			this.users.forEach((el, i) => {
				if(el._id == id) delete this.users[i];
			});
			this.doFilter();
		};
		if(this.http.deleteData("users_d", id)) callback();
	}
	deleteAddress(id_user: string, id_address: string) {
		let callback = () => {
			this.users.forEach((el, i) => {
				if(el._id == id_user) {
					for(let j = 0; j < el.address.length; j++) {
						if(el.address[j].id == id_address) delete this.users[i].address[j];
					}
				}
			});
			this.doFilter();
		};
		if(this.http.deleteData("users_d", id_user, id_address)) callback();
	}
	updateUser(user: User) {
		this.onOpenUserForm.emit({mode: "update_user", user_data: user});
	}


	openAddressForm(mode: Mode_, user_id: string, address?: Address_) {
		this.onOpenAddressForm.emit({mode: mode, user_id: user_id, address_data: address});
	}

	initData(users: User[]) {
		this.users = users;
	}
}
