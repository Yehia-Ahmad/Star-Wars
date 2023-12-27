import { ThemeService } from './../../Services/theme.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  isDark: boolean;
  maleGender: string = '../../../assets/Gender-Male.svg';
  femaleGender: string = '../../../assets/Gender-Female.svg';
  @Input() nextPage: string;
  @Input() previousPage: string;
  @Input() results: Array<any>;

  constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.themeChanger();
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
