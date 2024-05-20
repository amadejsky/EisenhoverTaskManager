import { HttpClient } from "@angular/common/http";
import { Router } from "express";
import { BehaviorSubject, catchError, throwError } from "rxjs";


export class AuthService{
    user = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient, private router: Router){}

    signup(email: string, password: string){
        return this.http.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVXOMLv7LJjC2vtp2KSwp7-bcJA4nUkO4',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(error=>{
                let errorMsg = 'An Unknown Error of Signup occured!';
                if (!error.error || !error.error.error) {
                    return throwError(errorMsg);
                }
                return throwError(errorMsg);
            })
        )};
        login(email: string, password: string) {
            return this.http.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVXOMLv7LJjC2vtp2KSwp7-bcJA4nUkO4',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            ).pipe(
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

}