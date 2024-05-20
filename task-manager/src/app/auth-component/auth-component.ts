import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.component.css'
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router){}
  isLogin: boolean = false;

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const pswd = form.value.password;
    let authObs: Observable<AuthResponseData>;
    if(this.isLogin){
      authObs = this.authService.login(email,pswd);
    }else{
      authObs = this.authService.signup(email,pswd);
    }
    authObs.subscribe(
      resData => {
          console.log(resData);
          this.router.navigate(['/about']);
      },
      errorMessage => {
          console.log(errorMessage);
      }
  )
    form.reset();

  }

  onSwitch(){
    this.isLogin=!this.isLogin;
  }

}
