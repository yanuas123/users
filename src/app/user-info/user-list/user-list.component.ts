import {Component, OnInit, Input} from '@angular/core';

import {ShareService} from '../share.service';

import {User} from '../../../user';
import {Popup} from "../../popup";

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	focus_item: string;
	focus_index: number = 0;

	constructor(private share: ShareService) {}
	@Input() users: User[];


	focusOnItem(e: Event, id: string, i: number) {
		if(e && (<HTMLElement> e.target).tagName == "BUTTON") return;
		this.focus_index = i;
		this.focus_item = id;
		this.share.doFocus(id);
	}
	keyboarEvents() {
		document.addEventListener("keydown", (e: KeyboardEvent) => {
			if(e.ctrlKey && e.code == "ArrowDown") {
				let n = this.focus_index + 1;
				if(this.users.length > n) {
					document.getElementById(`us${this.users[n]._id}`).click();
					this.focusOnItem(null, this.users[n]._id, n);
				}
			}
			if(e.ctrlKey && e.code == "ArrowUp") {
				let n = this.focus_index - 1;
				if(n >= 0) {
					document.getElementById(`us${this.users[n]._id}`).click();
					this.focusOnItem(null, this.users[n]._id, n);
				}
			}
		});
	}


	updateItem(user: User) {
		this.share.updateUser(user);
	}
	deleteItem(id: string) {
		Popup.open("question", "Are You sure You want to delete the user?", (resp: boolean) => {
			if(resp) this.share.deleteUser(id);
			else return;
		});
	}


	ngOnInit() {
		window.addEventListener("click", (e) => {
			if(!(<HTMLElement> e.target).closest("#user_info_container") && !(<HTMLElement> e.target).closest("#popups")) {
				this.focus_item = null;
				this.focus_index = 0;
				this.share.doFocus(null);
			}
		});

		this.keyboarEvents();
	}

}
