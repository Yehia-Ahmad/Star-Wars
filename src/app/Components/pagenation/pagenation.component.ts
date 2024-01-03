import { CharacterListService } from './../../Services/character-list.service';
import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-pagenation',
  templateUrl: './pagenation.component.html',
  styleUrls: ['./pagenation.component.scss'],
})
export class PagenationComponent implements OnInit {
  isDark: boolean;
  firstPage: boolean = true;
  lastPage: boolean = false;
  pageNum: number;
  @Input() finalPage: number;
  nextPage$: string | null;
  previousPage$: string | null;

  constructor(
    private api: APIService,
    private theme: ThemeService,
    private characterList: CharacterListService
  ) {}

  ngOnInit(): void {
    this.themeChanger();
    this.characterList.pageNum.subscribe((res: number) => {
      this.pageNum = res;
    });
    this.characterList.newList.subscribe((res: any) => {
      this.nextPage$ = res.next;
      this.previousPage$ = res.previous;
    });
  }

  themeChanger() {
    this.theme.isDark.subscribe((res: boolean) => {
      this.isDark = res;
    });
  }

  updateCharacterList(pageNum: string, url: string) {
    return this.api.getCharacterList(pageNum, url).subscribe((res: any) => {
      this.characterList.newList.next(res);
      this.nextPage$ = res.next;
      this.previousPage$ = res.previous;
      this.characterList.pageNum.next(+pageNum);
      this.checkPage();
    });
  }

  getNextPage() {
    if (this.nextPage$ != null) {
      let pageNum = this.nextPage$.slice(-1);
      this.updateCharacterList(pageNum, this.nextPage$);
      this.checkPage();
    }
  }

  getPreviousPage() {
    if (this.previousPage$ != null) {
      let pageNum = this.previousPage$.slice(-1);
      this.updateCharacterList(pageNum, this.previousPage$);
      this.checkPage();
    } else {
      this.pageNum = 1;
    }
  }

  checkPage() {
    if (this.pageNum === 1) {
      this.firstPage = true;
      this.lastPage = false;
    } else if (this.pageNum > 1 && this.pageNum < 9) {
      this.firstPage = false;
      this.lastPage = false;
    } else if (this.pageNum === 9) {
      this.firstPage = false;
      this.lastPage = true;
    }
  }
}
