import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  isLight: boolean = true;

  searchForm = this.formBuilder.group({
    search: ['', Validators.required],
  });

  constructor(private api: APIService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  searchCharacter(term: string) {
    return this.api.searchCharacter(term).subscribe((res: any) => {
      console.log(res);
    });
  }

  submitFormHandler(form: FormGroup) {
    let term: string = this.searchForm.value.search || '';
    console.log(term);
    this.searchCharacter(term);
  }
}
