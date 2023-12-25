import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  isDark: boolean;
  @Input() nextPage: string;
  @Input() previousPage: string;
  @Input() results: Array<any>;

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

  newPage(event: any) {
    this.results = event;
  }
}
