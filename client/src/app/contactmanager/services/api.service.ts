import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  path: string = environment.SERVER_PATH;
  users: User[] = [];
  constructor(
    private http: HttpClient
  ) { }

}
