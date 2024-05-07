import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private selected = new Subject<string>();

  onSelectHome(){
    this.selected.next('home');
  }
  onSelectAbout(){
   this.selected.next('about');
  }
}
