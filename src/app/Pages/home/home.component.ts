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
  count: number;
  nextPage: string;
  previousPage: string;
  results: Array<any>;

  constructor(
    private api: APIService,
    private theme: ThemeService,
    private language: LanguageService
  ) {}

  ngOnInit(): void {
    this.getCharacterList();
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

  updateCardListHandler(newResponse: any) {
    this.count = newResponse.count;
    this.nextPage = newResponse.nextPage;
    this.previousPage = newResponse.previousPage;
    this.results = newResponse.results;
  }

  getCharacterList() {
    return this.api.getCharacterList().subscribe((res: any) => {
      this.count = res.count;
      this.results = res.results;
      this.nextPage = res.next;
      this.previousPage = res.previous;
    });
  }
}
