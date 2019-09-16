import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {ShareService} from '../share.service';

import {Mode_} from "../modes";
import {Address_} from '../../../user';
import {Popup} from "../../popup";


type str_obj_ = {
	[item: string]: string[]
};

@Component({
  selector: 'app-address-subpage',
  templateUrl: './address-subpage.component.html',
  styleUrls: ['./address-subpage.component.scss']
})
export class AddressSubpageComponent implements OnInit {
	address: Address_[] = [];

	countries_obj: str_obj_;
	countries: string[];
	cities: string[] = [];

	active_address: Address_ = new Address_();

	constructor(private share: ShareService, private http: HttpClient, private router: Router) {}
	@Input() mode: Mode_;
	@Output() onNext = new EventEmitter<boolean>();
	@Input() update_address: Address_;

	getCountries() {
		this.http.get("assets/countries.json").subscribe((data: str_obj_) => {
			this.countries_obj = data;

			this.countries = Object.keys(data);

			if(this.active_address && this.active_address.country) {
				this.cities = this.countries_obj[this.active_address.country];
			}
		});
	}
	changeCountry() {
		this.cities = this.countries_obj[this.active_address.country];
	}


	add() {
		this.address[this.address.length] = this.active_address;
		console.log(this.address);
		this.active_address = new Address_();
	}
	delete(i: number | string) {
		if(typeof i == "number") {
			this.address.splice(i, 1);
		} else {
			this.active_address = this.address[this.address.length - 1];
			this.address.pop();
		}
		console.log(this.address);
	}


	next() {
		this.onNext.emit(true);
		let con_address = this.address.concat(this.active_address);
		console.log(con_address);
		this.share.setAddressData(con_address);
	}
	prev() {
		this.onNext.emit(false);
		let con_address = this.address.concat(this.active_address);
		console.log(con_address);
		this.share.setAddressData(con_address);
	}

	cancel() {
		this.share.cancel();
		this.router.navigate(['/']);
	}
	save() {
		this.address[this.address.length] = this.active_address;
		console.log(this.address);
		this.share.setAddressData(this.address);
		this.share.sendToServer(() => {
			Popup.open("information_saved");
			this.router.navigate(['/']);
		});
	}


	ngOnInit() {
		if(this.mode == "create_user") {
			let init_data: Address_[] = <Address_[]> this.share.getAddressData();
			if(init_data && init_data.length) {
				this.active_address = init_data[init_data.length - 1];
				init_data.splice(init_data.length - 1);
				this.address = init_data;
			}
		}
		else if(this.mode == "update_address" && this.update_address) {
			this.active_address = this.update_address;
		}

		if(this.mode == "update_address" || this.mode == "create_address") this.share.setMode(this.mode);

		this.getCountries();
  }

}
