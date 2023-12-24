import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isDark: boolean;
  firstPage: boolean = true;
  lastPage: boolean = false;
  pageNum: number = 1;
  nextPage: string;
  previousPage: string;
  results: Array<any>;

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.getCharacterList();
  }

  themeChanger($event: boolean) {
    this.isDark = $event;
  }

  dropHandler(event: CdkDragDrop<Array<any>>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  getCharacterList() {
    return this.api.getCharacterList().subscribe((res: any) => {
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
