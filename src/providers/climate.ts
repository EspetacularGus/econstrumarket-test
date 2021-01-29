import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root'
})
export class ClimateProvider {

	constructor(
		private http: HttpService,
	) { }

	getClimateInfo() {
		return new Promise((resolve, reject) => {
			this.http.get('weather?woeid=455827&format=json-cors')
			.then(res => {
				resolve(res);
			}).catch(err => { 
				reject(err)
			});
		})
	}

}
