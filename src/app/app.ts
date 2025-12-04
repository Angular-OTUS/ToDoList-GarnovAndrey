import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from './models/language.model';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tasksBoard');

  public btnLang: Language = "RU";

  constructor(private translate: TranslateService) {
    this.translate.setFallbackLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ru/) ? browserLang : 'en');
    this.btnLang = browserLang?.match(/en|ru/)? browserLang.toUpperCase() as Language : 'EN';
  }

  switchLang(){
    const currentLang = this.translate.getCurrentLang()
    let newLang = currentLang == 'ru'? 'en' : 'ru';
    this.btnLang = newLang.toUpperCase() as Language;
    this.translate.use(newLang);
  }
}
