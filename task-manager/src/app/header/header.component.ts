import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService){};
  private selected = new Subject<string>();
  isAuthenticated: boolean = false;
  private sub: Subscription = new Subscription();

  onSelectHome(){
    this.selected.next('home');
  }
  onSelectAbout(){
   this.selected.next('about');
  }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !user ? false: true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
