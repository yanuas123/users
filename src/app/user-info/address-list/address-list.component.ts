import {Component, Input} from '@angular/core';

import {ShareService} from '../share.service';

import {Address_} from '../../../user';
import {Popup} from "../../popup";

@Component({
	selector: 'app-address-list',
	templateUrl: './address-list.component.html',
	styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {

	constructor(private share: ShareService) {}
	@Input() addresses: Address_[];
	@Input() user_id: string;

	create() {
		this.share.openAddressForm("create_address", this.user_id);
	}
	update(address: Address_) {
		this.share.openAddressForm("update_address", this.user_id, address);
	}
	delete(id: string, i: number) {
		Popup.open("question", "Are You sure You want to delete the address?", (resp: boolean) => {
			if(resp) {
				this.share.deleteAddress(this.user_id, id);
				this.addresses.splice(i, 1);
			}
			else return;
		});
	}

}
