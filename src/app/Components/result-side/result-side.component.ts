import { Component } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';
import { SearchItemsService } from 'src/app/Services/search-items.service';

@Component({
  selector: 'app-result-side',
  templateUrl: './result-side.component.html',
  styleUrls: ['./result-side.component.scss'],
})
export class ResultSideComponent {
  firstPage: boolean = true;
  lastPage: boolean = false;
  pageNum: number = 1;
  nextPage: string;
  previousPage: string;
  results: Array<any>;

  constructor(
    private api: APIService,
    private searchItems: SearchItemsService
  ) {}

  ngOnInit(): void {
    this.getCharacterList();
  }

  getCharacterList() {
    return this.searchItems.newItems.subscribe((res: any) => {
      this.results = res.results;
      this.nextPage = res.next;
      this.previousPage = res.previous;
    });
  }

  getNextPage() {
    return this.api.getNextPage(this.nextPage).subscribe((res: any) => {
      this.results = res.results;
      this.nextPage = res.next;
      this.previousPage = res.previous;
      this.pageNum += 1;
      this.checkPage();
    });
  }

  getPreviousPage() {
    return this.api.getPreviousPage(this.previousPage).subscribe((res: any) => {
      this.results = res.results;
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
