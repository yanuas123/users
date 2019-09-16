import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

import {ShareService} from '../share.service';

import {Mode_} from "../modes";
import {User, User_} from '../../../user';
import {Popup} from "../../popup";

@Component({
  selector: 'app-user-subpage',
  templateUrl: './user-subpage.component.html',
  styleUrls: ['./user-subpage.component.scss']
})
export class UserSubpageComponent implements OnInit {
	user = new User();
	password_check: string = "";

	constructor(private share: ShareService, private router: Router) {

	}
	@Input() mode: Mode_;
	@Output() onNext = new EventEmitter<boolean>();
	@Input() update_user: User;

	next() {
		this.onNext.emit(true);
		this.share.setUserData(this.user);
	}
	cancel() {
		this.share.cancel();
		this.router.navigate(['/']);
	}
	save() {
		this.share.setUserData(this.user);
		this.share.sendToServer(() => {
			Popup.open("information_saved");
			this.router.navigate(['/']);
		});
	}


	ngOnInit() {
		let init_data: User;
		if(this.mode == "create_user") init_data = this.share.getUserData();
		else if(this.mode == "update_user" && this.update_user) init_data = this.update_user;
		if(init_data) {
			this.user = init_data;
			this.password_check = this.user.password;
		}

		if(this.mode == "update_user") {
			this.share.setMode(this.mode);
		}
  }

}
