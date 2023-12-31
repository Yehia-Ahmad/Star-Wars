import { CharacterListService } from './../../Services/character-list.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { APIService } from 'src/app/Services/api.service';
import { LanguageService } from 'src/app/Services/language.service';
import { ThemeService } from 'src/app/Services/theme.service';
import { APIResponse } from 'src/app/models';

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
  @Output() switchLangHandler = new EventEmitter();
  searchForm = this.formBuilder.group({
    search: [null, Validators.required],
  });

  constructor(
    private api: APIService,
    private theme: ThemeService,
    private language: LanguageService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private characterList: CharacterListService
  ) {}

  ngOnInit(): void {
    this.theme.isDark.next(Boolean(this.theme.getItem('isDark')));
    this.theme.isDark.subscribe((res: boolean) => {
      this.isDark = res;
    });
    this.language.lang.next(this.language.getItem('lang'));
    this.switchLangEffect(this.language.lang.value);
  }

  changeTheme() {
    this.theme.isDark.next(!this.isDark);
    this.isDark = this.theme.isDark.value;
    this.theme.setItem('isDark', this.isDark);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.language.setItem('lang', lang);
    this.switchLangEffect(lang);
  }

  switchLangEffect(lang: string) {
    if (lang == 'ar') {
      this.arBtn = 'accent';
      this.enBtn = 'primary';
      this.rightDirection.emit(true);
    } else if (lang == 'en') {
      this.arBtn = 'primary';
      this.enBtn = 'accent';
      this.rightDirection.emit(false);
    }
  }

  searchCharacter(term: string) {
    return this.api.searchCharacter(term).subscribe((res: any) => {
      this.characterList.newList.next(res);
      this.characterList.pageNum.next(1);
    });
  }

  submitFormHandler() {
    let term: string | null | undefined = this.searchForm.value.search;
    if (term != null) {
      this.searchCharacter(term);
      this.characterList.searchTerm.next(term);
    }
  }

  allCharacterList() {
    this.api.getCharacterList().subscribe((res: APIResponse) => {
      this.characterList.newList.next(res);
    });
  }

  clearForm() {
    this.searchForm.reset();
    this.allCharacterList();
    this.characterList.pageNum.next(1);
  }
}
