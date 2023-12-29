import { ThemeService } from './../../Services/theme.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

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
  @Input() rightDirection: boolean;
  @Input() count: number;
  @Input() nextPage: string;
  @Input() previousPage: string;
  @Input() results: Array<any>;

  constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    this.theme.isDark.next(Boolean(this.theme.getItem('isDark')));
    this.theme.isDark.subscribe((res: boolean) => {
      this.isDark = res;
    });
    this.themeChanger();
  }

  ngOnChanges(): void {
    if (this.count > 10) {
      let reminder = this.count % 10;
      let temp = Math.floor(this.count / 10);
      if (reminder > 0) {
        this.finalPage = temp + 1;
      }
    } else {
      this.finalPage = 0;
    }
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

  newPage(event: any) {
    this.results = event;
  }
}
