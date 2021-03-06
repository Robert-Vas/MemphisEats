import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpService) {
    }

    public getUser() {
        this.http.get('/user/getList');
    }
}
