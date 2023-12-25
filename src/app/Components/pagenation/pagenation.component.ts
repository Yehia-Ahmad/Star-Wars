import { Component, EventEmitter, Input, Output } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-pagenation',
  templateUrl: './pagenation.component.html',
  styleUrls: ['./pagenation.component.scss'],
})
export class PagenationComponent {
  isDark: boolean;
  firstPage: boolean = true;
  lastPage: boolean = false;
  pageNum: number = 1;
  @Input() nextPage: string;
  @Input() previousPage: string;
  @Output() results = new EventEmitter();

  constructor(private api: APIService) {}

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
