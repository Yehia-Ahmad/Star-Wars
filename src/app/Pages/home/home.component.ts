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

  getCharacterList() {
    return this.api.getCharacterList().subscribe((res: any) => {
      this.results = res.results;
      this.nextPage = res.next;
      this.previousPage = res.previous;
    });
  }
}
