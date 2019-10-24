import { Component, OnInit } from '@angular/core';
import {
  getCurrentAccessToken,
  login as fbLogin,
  LoginEventData,
  logout as fbLogout,
} from 'nativescript-facebook';
import { getJSON } from 'tns-core-modules/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private _httpClient: HttpClient) {
  }

  onLogin(eventData: LoginEventData) {

    if (!eventData.error) {
      this.getFbData();
      console.log('defaultLogin', eventData.loginResponse.token);
      return;
    }

    alert(`Error during login: ${ eventData.error }`);
  }

  ngOnInit(): void {

    // this.getFbData();
  }

  login() {

    fbLogin((error, fbData) => {

      if (!error) {
        console.log('customLogin', fbData.token);
        console.dir('fbData', fbData);
        this.getFbData();
        return;
      }

      alert(`Error during login: ${ error.message }`);
    });
  }

  onLogout(eventData) {

    if (!eventData.error) {
      console.log('logged out');
    }

    alert(`Error during logout: ${ eventData.error }`);
  }

  logout() {

    fbLogout(() => {

      console.log('Custom logged out');
    });
  }

  getFbData() {

    const fbUrl = 'https://graph.facebook.com/v4.0';

    const user = getCurrentAccessToken();

    this._httpClient.get(`${ fbUrl }/me?access_token=${ user.accessToken }`)
        .subscribe((res) => {
          const username = res['name'];
          const userId = res['id'];

          console.dir('user', res);

          // Get logged in user's avatar
          // ref: https://github.com/NativeScript/NativeScript/issues/2176
          this._httpClient.get(`${ fbUrl }/${ userId }/picture?type=large&redirect=false&access_token=${ user.accessToken }`)
              .subscribe((res) => {

                console.dir('picture', res);

                const avatarUrl = res['data']['url'];
              }, function (err) {

                console.dir('Error getting user info: ' + err);
              });
        }, function (err) {

          console.dir('Error getting user info: ' + err);
        });
  }
}
