import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { APIService } from 'src/app/Services/api.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isDark: boolean;
  arBtn: string = 'primary';
  enBtn: string = 'accent';
  @Output() newCardList = new EventEmitter();
  @Output() rightDirection = new EventEmitter();
  searchForm = this.formBuilder.group({
    search: [null, Validators.required],
  });

  constructor(
    private api: APIService,
    private theme: ThemeService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.theme.isDark.next(Boolean(this.theme.getItem('isDark')));
    this.theme.isDark.subscribe((res: boolean) => {
      this.isDark = res;
    });
  }

  changeTheme() {
    this.theme.isDark.next(!this.isDark);
    this.isDark = this.theme.isDark.value;
    this.theme.setItem('isDark', this.isDark);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    if (lang == 'ar') {
      console.log('ar');
      this.arBtn = 'accent';
      this.enBtn = 'primary';
      this.rightDirection.emit(true);
    } else if (lang == 'en') {
      console.log('en');
      this.arBtn = 'primary';
      this.enBtn = 'accent';
      this.rightDirection.emit(false);
    }
  }

  searchCharacter(term: string) {
    return this.api.searchCharacter(term).subscribe((res: any) => {
      let newItem: any = {
        count: res.count,
        next: res.next,
        previous: res.previous,
        results: res.results,
      };
      this.newCardList.emit(newItem);
    });
  }

  submitFormHandler() {
    let term: string | null | undefined = this.searchForm.value.search;
    if (term != null) {
      this.searchCharacter(term);
    }
  }

  clearForm() {
    this.searchForm.reset();
  }
}
