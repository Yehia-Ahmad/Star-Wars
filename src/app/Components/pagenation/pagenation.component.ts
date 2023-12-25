import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  pageNum: number = 1;
  @Input() nextPage: string;
  @Input() previousPage: string;
  @Output() results = new EventEmitter();

  constructor(private api: APIService, private theme: ThemeService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.themeChanger();
  }

  themeChanger() {
    this.theme.isDark.subscribe((res: boolean) => {
      this.isDark = res;
    });
  }

  getNextPage() {
    return this.api.getNextPage(this.nextPage).subscribe((res: any) => {
      this.results.emit(res.results);
      this.nextPage = res.next;
      this.previousPage = res.previous;
      this.pageNum += 1;
      this.checkPage();
    });
  }

  getPreviousPage() {
    return this.api.getPreviousPage(this.previousPage).subscribe((res: any) => {
      this.results.emit(res.results);
      this.nextPage = res.next;
      this.previousPage = res.previous;
      this.pageNum -= 1;
      this.checkPage();
    });
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
