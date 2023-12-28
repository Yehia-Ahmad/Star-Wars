import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  isDark: boolean;
  @Output() themeChanger = new EventEmitter();
  @Output() newCardList = new EventEmitter();
  searchForm = this.formBuilder.group({
    search: [null, Validators.required],
  });

  constructor(
    private router: Router,
    private api: APIService,
    private theme: ThemeService,
    private formBuilder: FormBuilder
  ) {
    this.isDark = this.theme.isDark.value;
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
      this.newCardList.emit(newItem);
    });
  }

  submitFormHandler() {
    let term: string | null | undefined = this.searchForm.value.search;
    if (term != null) {
      this.searchCharacter(term);
    }
  }

  clearForm() {
    this.searchForm.reset();
  }
}
