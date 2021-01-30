import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	public user: any;
	public activeModal: any;
	public delay: any;

	constructor(
		private http: HttpClient,
	) { }


	public get(path: string): any {
		return this.request(path, 'get', {});
	}

	public post(path: string, data: any): any {
		return this.request(path, 'post', data);
	}

	private request(path: string, method: string,  data: any): any {

		let url: string = String(environment.API_URL);
		if (path && path !== null) {
			url = String(environment.API_URL) + '/' + path + '&key=' + environment.API_KEY
		}

		const headers: any = {};
		headers['Content-Type'] = 'application/json;';
		let params: Array<any>;

		if (method === 'post') {
			params = [url, data, { headers, responseType: 'text' }];
		} else {
			params = [url, { headers }];
		}

		this.showLoader();
		return new Promise((resolve, reject) => {
			this.http[method](...params)
				.subscribe(res => {
					this.hideLoader(); 
					resolve(res);
				}, (err) => {
					this.hideLoader();
					reject(err);
				});
		});
	}

	showLoader(): void {
		environment.loading = true;
	}

	hideLoader(): void {
		environment.loading = false;
	}
}
