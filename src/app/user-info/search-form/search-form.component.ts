import {Component} from '@angular/core';

import {ShareService} from '../share.service';

export class SearchForm {
	constructor(
		public firstname: string = "",
		public lastname: string = "",
		public username: string = "",
		public email: string = "",
		public phone: string = ""
	) {}
}
@Component({
	selector: 'app-search-form',
	templateUrl: './search-form.component.html',
	styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
	fields: SearchForm = new SearchForm();
	empty_form: boolean = false;

	constructor(private share: ShareService) {}

	clear() {
		this.fields = new SearchForm();
		this.share.doFilter(this.fields);
	}
	find(e: Event) {
		e.stopPropagation();
		let max_length: string = "";
		for(let key in this.fields) {
			let descriptor = <string> Object.getOwnPropertyDescriptor(this.fields, key).value;
			if(descriptor && descriptor.length > max_length.length) max_length = descriptor;
		}
		if(max_length.length > 1) this.share.doFilter(this.fields);
		else this.empty_form = true;
	}
	repeatEnter() {
		this.empty_form = false;
	}

}
