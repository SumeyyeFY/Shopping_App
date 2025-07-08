import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProperties } from '../user-properties';
import { UserInfo } from '../user-info';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  @Input() userProperties!:UserProperties;
  userInfo: UserInfo = inject(UserInfo);
}
