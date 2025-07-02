import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./components/home/home";
import { Header } from "./components/header/header";
import { SharedStateService } from './services/shared-state';
import { Preview } from "./components/preview/preview";
import { NgxSpinnerModule } from 'ngx-spinner';
import { Results } from "./components/results/results";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header, Preview, NgxSpinnerModule, Results],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'resume-reviewer';
  resumeService = inject(SharedStateService)
  resumeFile = this.resumeService.resumeFile

}
