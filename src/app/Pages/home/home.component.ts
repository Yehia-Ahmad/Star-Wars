import { APIResponse } from './../../Models';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isMale: boolean = true;
  results: Array<any>;
  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.getCharacterList();
  }

  getCharacterList() {
    return this.api.getCharacterList().subscribe((res: any) => {
      this.results = res.results;
      console.log(this.results);
    });
  }
}
