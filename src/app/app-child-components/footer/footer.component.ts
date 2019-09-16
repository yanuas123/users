import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	copyrights = '&#169; All rights reserved';

	constructor() {}

	@Input() title: string;

}
