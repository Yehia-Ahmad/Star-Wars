import { ThemeService } from './../../Services/theme.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APIService } from 'src/app/Services/api.service';
import { CharacterListService } from 'src/app/Services/character-list.service';
import { LanguageService } from 'src/app/Services/language.service';
import { APIResponse } from 'src/app/models';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnChanges {
  isDark: boolean;
  maleGender: string = '../../../assets/Gender-Male.svg';
  femaleGender: string = '../../../assets/Gender-Female.svg';
  finalPage: number;
  next: string | null;
  previous: string | null;
  searchFailure: boolean = false;
  newcharacterList$: APIResponse;
  @Input() rightDirection: boolean;

  constructor(
    private api: APIService,
    private characterList: CharacterListService,
    private theme: ThemeService,
    private language: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getCharacterList();
    this.characterList.newList.subscribe((res: any) => {
      this.newcharacterList$ = res;
      this.next = this.newcharacterList$.next;
      this.previous = this.newcharacterList$.previous;
      if (this.newcharacterList$.count > 10) {
        let reminder = this.newcharacterList$.count % 10;
        let temp = Math.floor(this.newcharacterList$.count / 10);
        if (reminder > 0) {
          this.finalPage = temp + 1;
        }
      } else {
        this.finalPage = 0;
      }
    });
    this.theme.isDark.next(Boolean(this.theme.getItem('isDark')));
    this.theme.isDark.subscribe((res: boolean) => {
      this.isDark = res;
    });
    this.themeChanger();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['results']) {
      this.language.lang.subscribe((res: string) => {
        this.translate.use(res);
      });
    }
  }

  getCharacterList() {
    return this.api.getCharacterList().subscribe((res: any) => {
      this.characterList.newList.next(res);
    });
  }

  themeChanger() {
    this.theme.isDark.subscribe((res: boolean) => {
      this.isDark = res;
      if (this.isDark === true) {
        this.maleGender = '../../../assets/Gender-Male-Light.svg';
        this.femaleGender = '../../../assets/Gender-Female-Light.svg';
      } else {
        this.maleGender = '../../../assets/Gender-Male.svg';
        this.femaleGender = '../../../assets/Gender-Female.svg';
      }
    });
  }

  dropHandler(event: CdkDragDrop<Array<any>>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
