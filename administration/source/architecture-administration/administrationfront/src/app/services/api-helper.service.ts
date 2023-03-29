import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../interfaces/constants';


const url=Constants.url;

@Injectable({
    providedIn: 'root',
})
export class ApiHelperService {
    constructor(private http: HttpClient) { }

    public get({
        endpoint,
        queryParams = {},
    }: {
        endpoint: string;
        queryParams?: any;
    }): Promise<any> {
        return this.request({ endpoint, method: 'GET', queryParams });
    }

    public post({
        endpoint,
        data = {},
        queryParams = {},
    }: {
        endpoint: string;
        data?: any;
        queryParams?: any;
    }): Promise<any> {
        return this.request({ endpoint, method: 'POST', data, queryParams });
    }

    public put({
        endpoint,
        data = {},
        queryParams = {},
    }: {
        endpoint: string;
        data?: any;
        queryParams?: any;
    }): Promise<any> {
        return this.request({ endpoint, method: 'PUT', data, queryParams });
    }

    public delete({
        endpoint,
        data = {},
        queryParams = {},
    }: {
        endpoint: string;
        data?: any;
        queryParams?: any;
    }): Promise<any> {
        return this.request({ endpoint, method: 'DELETE', data, queryParams });
    }

    public async request({
        endpoint,
        method = 'GET',
        data = {},
        queryParams = {},
    }: {
        endpoint: string;
        method?: string;
        data?: object;
        queryParams?: any;
    }): Promise<any> {
        const methodWanted = method.toLowerCase();

        const final_url = url + endpoint;

        const requestOptions = {
            params: queryParams,
        };


        let req: Observable<any>;
        if (methodWanted === 'get') {
            req = this.http.get(final_url, { ...requestOptions, observe: 'response' });
        } else if (methodWanted === 'post') {
            req = this.http.post(final_url, data, {
                ...requestOptions,
                observe: 'response',
            });
        } else if (methodWanted === 'put') {
            req = this.http.put(final_url, data, {
                ...requestOptions,
                observe: 'response',
            });
        } else {
            req = this.http.delete(final_url, { ...requestOptions, observe: 'response' });
        }

        if (!req) {
            throw new Error(`error calling ${final_url} with method ${methodWanted}`);
        }

        return await lastValueFrom(req).then((res) => {
            return res.body;
        });
    }
}

