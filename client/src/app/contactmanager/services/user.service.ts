import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
  private baseUrl = environment.SERVER_PATH;
  // private subject to pass the Observable onto
  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[]
  };

  constructor(
    private http: HttpClient
  ) {
    this.dataStore = { users: [] };
    // Get property to allow subscription to BehaviorSubject
    this._users = new BehaviorSubject<User[]>([]);

   }

  // Allow components to subscribe to the get call
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  addUser(user: User): Promise<User> {
    console.log('adding user: ', user);

    this.http.post(this.baseUrl + '/user', user)
      .subscribe(res => {
        this.getAllUsers();
      });

    return new Promise((resolve, reject) => {
      resolve(user);
    });
  }

  getAllUsers() {
    // subscribe to the users on the api
    return this.http.get<any>(this.baseUrl)
      .subscribe( data => {
        this.dataStore.users = data.users;
        // create a new object and copy the contents of the users in the datastore onto it --> Immutability
        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.error('error in user-service loadAll: ', error);
      });
  }

  userById(id: string) {
    return this.dataStore.users.find(x => x._id == id);
  }

  deleteUser(userId) {
    return this.http.delete(`${this.baseUrl}/user/${userId}`);
  }

  updateUser(user) {
    return this.http.put(`${this.baseUrl}/user/${user._id}`, user);
  }

}
