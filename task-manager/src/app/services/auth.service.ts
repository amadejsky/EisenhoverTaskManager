import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../auth-component/user.model";
import { environment } from "../environment/environment";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    //optional for sign up 
    registered?:boolean;
}


@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User | null >(null);
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router){}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`+ environment.authKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            tap(resData => {
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                const user = new User(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    expirationDate
                );
                this.user.next(user);
                this.autoLogout(+resData.expiresIn * 1000);

                this.login(email, password).subscribe(
                    userData => {
                        console.log(email+' '+password);
                    },
                    error => {
                        console.log(error);
                    }
                );
            }),
            catchError(error => {
                let errorMsg = 'An Unknown Error of Signup occurred!';
                if (!error.error || !error.error.error) {
                    return throwError(errorMsg);
                }
                return throwError(errorMsg);
            })
        );
    }
    
        login(email: string, password: string) {
            return this.http.post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`+ environment.authKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    const user = new User(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        expirationDate
                    );
                    this.user.next(user); 
                    this.autoLogout(+resData.expiresIn * 1000); 
                }),
                catchError(error => {
                    let errorMsg = 'An Unknown Error of Login occurred!';
                    if (!error.error || !error.error.error) {
                        return throwError(errorMsg);
                    }
                    switch (error.error.error.message) {
                        case 'EMAIL_NOT_FOUND':
                            errorMsg = 'This email address was not found.';
                            break;
                        case 'INVALID_PASSWORD':
                            errorMsg = 'The password is invalid.';
                            break;       
                    }
                    return throwError(errorMsg);
                })
            );
        }

        logout() {
            this.user.next(null);
            this.router.navigate(['/auth']);
            if (this.tokenExpirationTimer) {
              clearTimeout(this.tokenExpirationTimer);
            }
            this.tokenExpirationTimer = null;
          }
        
          autoLogout(expirationDuration: number) {
            this.tokenExpirationTimer = setTimeout(() => {
              this.logout();
            }, expirationDuration);
          }    

}