import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { SearchItemsService } from 'src/app/Services/search-items.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  isDark: boolean;
  @Output() themeChanger = new EventEmitter();
  searchForm = this.formBuilder.group({
    search: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private api: APIService,
    private theme: ThemeService,
    private formBuilder: FormBuilder,
    private searchItems: SearchItemsService
  ) {
    this.isDark = this.theme.isDark.value;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  changeTheme() {
    this.theme.isDark.next(!this.isDark);
    this.isDark = this.theme.isDark.value;
    this.themeChanger.emit(this.isDark);
  }

  searchCharacter(term: string) {
    return this.api.searchCharacter(term).subscribe((res: any) => {
      let newItem: any = {
        next: res.next,
        previous: res.previous,
        results: res.results,
      };
      this.searchItems.newItems.next(newItem);
      console.log(res);
      console.log(this.searchItems.newItems.value);
    });
  }

  submitFormHandler(form: FormGroup) {
    let term: string = this.searchForm.value.search || '';
    console.log(term);
    this.searchCharacter(term);
    this.router.navigate(['results']);
  }
}
