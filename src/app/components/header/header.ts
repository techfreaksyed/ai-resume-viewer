import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
