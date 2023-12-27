import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { SearchItemsService } from 'src/app/Services/search-items.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
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
    private location: Location,
    private searchItems: SearchItemsService
  ) {
    this.isDark = this.theme.isDark.value;
  }

  goBack() {
    this.location.back();
  }

  changeTheme() {
    this.theme.isDark.next(!this.isDark);
    this.isDark = this.theme.isDark.value;
    this.themeChanger.emit(this.isDark);
  }

  searchCharacter(term: string) {
    return this.api.searchCharacter(term).subscribe((res: any) => {
      let newItem: any = {
        count: res.count,
        next: res.next,
        previous: res.previous,
        results: res.results,
      };
      if (res.count === 0) {
        this.router.navigate(['notfound']);
      }
      this.searchItems.newItems.next(newItem);
    });
  }

  submitFormHandler(form: FormGroup) {
    let term: string = this.searchForm.value.search || '';
    this.searchCharacter(term);
    this.router.navigate(['results']);
  }
}
