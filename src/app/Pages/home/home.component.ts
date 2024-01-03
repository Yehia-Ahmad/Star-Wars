import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { LanguageService } from 'src/app/Services/language.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isDark: boolean;
  rightDirection: boolean = false;

  constructor(private theme: ThemeService, private language: LanguageService) {}

  ngOnInit(): void {
    this.theme.isDark.next(Boolean(this.theme.getItem('isDark')));
    this.theme.isDark.subscribe((res: boolean) => {
      this.isDark = res;
    });

    this.language.lang.subscribe((res: string) => {
      res == 'en'
        ? this.updateDirectionHandler(false)
        : this.updateDirectionHandler(true);
    });
  }

  updateDirectionHandler(event: boolean) {
    this.rightDirection = event;
  }
}
