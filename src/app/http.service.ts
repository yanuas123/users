import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Popup} from "./popup";
import {User, Address_} from './../user';


export interface mode_property_ {
	method: string,
	action: string,
	id?: string,
	id2?: string
	data?: User | Address_
}

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) {}

	getData() {
		return this.http.get('assets/db.json');
	}

	deleteData(action: string, id1: string, id2?: string) {
		let options = {
			headers: new HttpHeaders({
				'Access-Control-Allow-Origin': '*'
			})
		};
		let path = "http://localhost:8080/" + action;
		path += ("/" + id1);
		if(id2) path += ("&" + id2);
		//return this.http.delete(path, options);
		console.log(path);
		return true;
	}
	postData(prop: mode_property_) {
		let path = "http://localhost:8080/" + prop.action;
		if(prop.id) path += ("/" + prop.id);
		//return this.http.post(path, prop.data, this.http_options);
		console.log(path);
		console.log(prop.data);
		return true;
	}
	putData(prop: mode_property_) {
		let path = "http://localhost:8080/" + prop.action;
		if(prop.id) path += ("/" + prop.id);
		if(prop.id2) path += ("&" + prop.id2);
		//return this.http.put(path, prop.data, this.http_options);
		console.log(path);
		console.log(prop.data);
		return true;
	}
}
