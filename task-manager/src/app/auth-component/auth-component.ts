import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.component.css'
})
export class AuthComponent {
  isLogin: boolean = true;

  onSubmit(form: NgForm){

  }

  onSwitch(){
    this.isLogin=!this.isLogin;
  }

}
