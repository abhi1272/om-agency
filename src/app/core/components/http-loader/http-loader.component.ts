import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-http-loader',
  template: `
    <div class="progress-loader" [hidden]="!loading">
      <div class="loading-spinner">
          <mat-spinner></mat-spinner>
      </div>
    </div>
  `,
  styleUrls: ['./http-loader.component.css']
})
export class HttpLoaderComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private loaderService: LoaderService
  ) {
    this.loaderService.isHttpLoading.subscribe(data => {
      this.loading = data;
    });
  }

  ngOnInit(): void {
  }

}
