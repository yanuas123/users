import {Component, OnInit} from '@angular/core';

import {ShareService} from '../share.service';

import {Mode_} from "../modes";
const subpage_collection = [
	"user", "address", "summary"
];

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
	active_subpage: string;
	active_subpage_n: number;
	mode: Mode_;

	constructor(private share: ShareService) {
		this.mode = "create_user";
		this.active_subpage_n = 0;
		this.active_subpage = subpage_collection[this.active_subpage_n];
	}

	onNext(dir: boolean) {
		if(dir) {
			this.active_subpage_n++;
			this.active_subpage = subpage_collection[this.active_subpage_n];
		} else {
			this.active_subpage_n--;
			this.active_subpage = subpage_collection[this.active_subpage_n];
		}
	}

	ngOnInit() {
		this.share.setMode(this.mode);
  }

}
