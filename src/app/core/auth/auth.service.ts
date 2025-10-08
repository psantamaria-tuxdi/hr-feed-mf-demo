import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { LoginPayloadDTO, LoginResponseDTO } from './auth.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  private _userService = inject(UserService);

  private readonly accessTokenKey = 'hr-feed.accessToken';

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  get accessToken(): string {
    return localStorage.getItem(this.accessTokenKey) ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  signIn(): Observable<boolean> {
    // Login with storage data if available
    if (
      this.accessToken &&
      !AuthUtils.isTokenExpired(this.accessToken)
    ) {
      this._userService.refresh();
      this._authenticated = true;
      return of(true);
    }

    const payload = this.getLoginPayload();
    return this._httpClient
      .post<LoginResponseDTO>(environment.apiUrl + 'auth/login', payload)
      .pipe(
        switchMap((response) => {
          if (!response || !response.hr_access_token) {
            // If the response is not valid, return false
            return of(false);
          }

          // Store the access token in the local storage
          this.accessToken = response.hr_access_token;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          this._userService.user = response.user;

          return of(true);
        }),
        catchError(() =>
          // Return false
          of(false)
        )
      );
  }

  /**
   * Forgot password
   *
   * @param email
   */
  // forgotPassword(email: string): Observable<any> {
  //     return this._httpClient.post('api/auth/forgot-password', email);
  // }

  /**
   * Reset password
   *
   * @param password
   */
  // resetPassword(password: string): Observable<any> {
  //     return this._httpClient.post('api/auth/reset-password', password);
  // }

  /**
   * Sign in
   *
   * @param credentials
   */
  // signIn(credentials: { email: string; password: string }): Observable<any> {
  //     // Throw error, if the user is already logged in
  //     if (this._authenticated) {
  //         return throwError('User is already logged in.');
  //     }

  //     return this._httpClient.post('api/auth/sign-in', credentials).pipe(
  //         switchMap((response: any) => {
  //             // Store the access token in the local storage
  //             this.accessToken = response.accessToken;

  //             // Set the authenticated flag to true
  //             this._authenticated = true;

  //             // Store the user on the user service
  //             this._userService.user = response.user;

  //             // Return a new observable with the response
  //             return of(response);
  //         })
  //     );
  // }

  /**
   * Sign in using the access token
   */
  // signInUsingToken(): Observable<any> {
  //     // Sign in using the token
  //     return this._httpClient
  //         .post('api/auth/sign-in-with-token', {
  //             accessToken: this.accessToken,
  //         })
  //         .pipe(
  //             catchError(() =>
  //                 // Return false
  //                 of(false)
  //             ),
  //             switchMap((response: any) => {
  //                 // Replace the access token with the new one if it's available on
  //                 // the response object.
  //                 //
  //                 // This is an added optional step for better security. Once you sign
  //                 // in using the token, you should generate a new one on the server
  //                 // side and attach it to the response object. Then the following
  //                 // piece of code can replace the token with the refreshed one.
  //                 if (response.accessToken) {
  //                     this.accessToken = response.accessToken;
  //                 }

  //                 // Set the authenticated flag to true
  //                 this._authenticated = true;

  //                 // Store the user on the user service
  //                 this._userService.user = response.user;

  //                 // Return true
  //                 return of(true);
  //             })
  //         );
  // }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem(this.accessTokenKey);
    this._userService.reset();

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  // signUp(user: {
  //     name: string;
  //     email: string;
  //     password: string;
  //     company: string;
  // }): Observable<any> {
  //     return this._httpClient.post('api/auth/sign-up', user);
  // }

  /**
   * Unlock session
   *
   * @param credentials
   */
  // unlockSession(credentials: {
  //     email: string;
  //     password: string;
  // }): Observable<any> {
  //     return this._httpClient.post('api/auth/unlock-session', credentials);
  // }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    return this.signIn();

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    // return this.signInUsingToken();
  }

  private getLoginPayload(): LoginPayloadDTO {
    if (environment.name === 'humanage') {
      const payload: LoginPayloadDTO = {
        externalUserId: localStorage.getItem('userId'),
        displayName: `${localStorage.getItem('userFirstname')} ${localStorage.getItem('userLastname')}`,
        firstName: localStorage.getItem('userFirstname'),
        lastName: localStorage.getItem('userLastname'),
        roles: [], // Assuming roles are not provided, adjust as necessary
        expiresIn: Number(localStorage.getItem('expires_in')),
      };

      if (!payload.externalUserId) {
        console.error('Invalid login payload:', payload);
        throw new Error('Invalid login payload');
      }

      return payload;
    }

    if (environment.name === 'axton') {
        throw new Error('Axton login is implemented in host application');
    }

    if (!environment.production) {
      return {
        externalUserId: 'dev-user-id',
        displayName: 'Dev User',
        firstName: 'Dev',
        lastName: 'User',
        roles: [],
        expiresIn: 3600,
      };
    }
  }
}
