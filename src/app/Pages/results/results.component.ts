import { Component } from '@angular/core';
import { SearchItemsService } from 'src/app/Services/search-items.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  count: number;
  nextPage: string;
  previousPage: string;
  results: Array<any>;

  constructor(private searchItems: SearchItemsService) {}

  ngOnInit(): void {
    this.getCharacterList();
  }

  getCharacterList() {
    return this.searchItems.newItems.subscribe((res: any) => {
      this.count = res.count;
      this.results = res.results;
      this.nextPage = res.next;
      this.previousPage = res.previous;
    });
  }
}
