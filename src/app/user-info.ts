import { Injectable } from '@angular/core';
import { User } from './user/user';
import { UserProperties } from './user-properties';

@Injectable({
  providedIn: 'root'
})
export class UserInfo {
  protected userList: UserProperties[] = [
    {
      "id": 0,
      "photo": "/assets/default-user.svg",
      "firstName": "Anne",
      "lastName": "Hathaway",
      "email": "h.anne@mail.com",
      "password": 1111
    },
        {
      "id": 0,
      "photo": "/assets/default-user.svg",
      "firstName": "Robinson",
      "lastName": "Crusoe",
      "email": "cr.robin@mail.com",
      "password": 2222
    },
        {
      "id": 0,
      "photo": "/assets/default-user.svg",
      "firstName": "Alex",
      "lastName": "Morgan",
      "email": "m.alex@mail.com",
      "password": 3333
    }
  ];

  constructor() { }

  isUserMail(email: string) {
    return this.userList.find(user => user.email === email);
  }

  isCorrectPassword(email: string, password: number) {
    return this.userList.find(user => user.email)?.password === password;
  }
}
