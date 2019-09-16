import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

import {ShareService} from '../share.service';

import {Mode_} from "../modes";
import {User} from '../../../user';
import {Popup} from "../../popup";

@Component({
	selector: 'app-summary-subpage',
	templateUrl: './summary-subpage.component.html',
	styleUrls: ['./summary-subpage.component.scss']
})
export class SummarySubpageComponent implements OnInit {
	user: User;

	constructor(private share: ShareService, private router: Router) {}
	@Input() mode: Mode_;
	@Output() onNext = new EventEmitter<boolean>();

	prev() {
		this.onNext.emit(false);
	}
	cancel() {
		this.share.cancel();
		this.router.navigate(['/']);
	}
	save() {
		this.share.sendToServer(() => {
			Popup.open("information_saved");
			this.router.navigate(['/']);
		});
	}

	ngOnInit() {
		let init_data: User;
		if(this.mode == "create_user") init_data = this.share.getUserData();
		if(init_data) this.user = init_data;
	}

}
