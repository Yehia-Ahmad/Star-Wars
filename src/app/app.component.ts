import { Component } from '@angular/core';
import { LoadingService } from './Services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Star-Wars';
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService) {}
}
