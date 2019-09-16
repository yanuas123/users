import {Injectable, EventEmitter} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

import {HttpService, mode_property_} from '../http.service';

import {User, Address_} from '../../user';
import {Mode_} from "./modes";


const mode_property: {[item: string]: mode_property_} = {
	create_user: {
		method: "post",
		action: "users_d",
		data: null
	},
	update_user: {
		method: "put",
		action: "users_d",
		id: null,
		data: null
	},
	create_address: {
		method: "post",
		action: "address",
		id: null,
		data: null
	},
	update_address: {
		method: "put",
		action: "address",
		id: null,
		id2: null,
		data: null
	}
};

@Injectable({
	providedIn: 'root'
})
export class ShareService {
	mode: Mode_;
	user: User;
	user_id: string;
	address: Address_;
	current_prop: mode_property_;

	constructor(private http: HttpService, private cookieService: CookieService) {}


	setMode(mode: Mode_) {
		this.mode = mode;
		this.current_prop = mode_property[mode];
	}

	getUserData(): User {
		if(this.user) return this.user;
		else {
			let user_json = this.cookieService.get("user");
			if(user_json) this.user = JSON.parse(user_json);
			return this.user;
		}
	}
	setUserData(user: User) {
		this.user = user;
		let user_json = JSON.stringify(user);
		this.cookieService.set("user", user_json);
	}

	getAddressData(): Address_[] {
		if(this.user && this.user.address) return this.user.address;
		else {
			let address_json = this.cookieService.get("address");
			if(address_json) this.user.address = JSON.parse(address_json);
			return this.user.address;
		}
	}
	setAddressData(address: Address_[], user_id?: string) {
		if(this.mode == "create_user") {
			this.user.address = address;
			let address_json = JSON.stringify(address);
			this.cookieService.set("address", address_json);
		}
		else if(this.mode == "create_address" || this.mode == "update_address") this.address = address[0];
		if(user_id) this.user_id = user_id;
	}


	cancel() {
		this.mode = null;
		this.user = null;
		this.address = null;
		this.cookieService.deleteAll();
	}
	sendToServer(call?: Function) {
		if(this.mode == "create_user" || this.mode == "update_user") {
			if(this.current_prop.data === null) this.current_prop.data = this.user;
			if(this.current_prop.id === null) this.current_prop.id = this.user._id;
		} else if(this.mode == "create_address" || this.mode == "update_address") {
			if(this.current_prop.data === null) this.current_prop.data = this.address;
			if(this.current_prop.id === null) this.current_prop.id = this.user_id;
			if(this.current_prop.id2 === null) this.current_prop.id2 = this.address.id;
		}

		let callback = () => {
			if(call) call();
			this.cancel();
		};
		if(this.current_prop.method == "post") {
			if(this.http.postData(this.current_prop)) callback();
		}
		else if(this.current_prop.method == "put") {
			if(this.http.putData(this.current_prop)) callback();
		}
	}
}
