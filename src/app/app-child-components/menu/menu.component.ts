import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
	items = [{
		path: "", title: "Main"
	}, {
		path: "users", title: "User Information"
	}, {
		path: "create-user", title: "Create User"
		}];

	@Input() menu_type: string;
	@Input() tabindex: boolean;

}
