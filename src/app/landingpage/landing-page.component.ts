import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AsyncPipe, NgOptimizedImage, NgStyle} from "@angular/common";
import {Heroes} from "../../Interfaces/DotaHero";
import {SearchComponent} from "../search/search.component";
import {FilterComponent} from "../filter/filter.component";
import {FilterServiceService} from "../../Services/filter-service.service";
import {RouterLink} from "@angular/router";
import {DotaOfficialApiServiceService} from "../../Services/DotaApiServices/dota-official-api-service.service";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    SearchComponent,
    NgStyle,
    FilterComponent,
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  public heroes$!: Observable<Heroes>
  public filters$ = this.filter.getFilters()

  ngOnInit(): void {
    this.filters$.subscribe(x => {
      this.heroes$ = this.filter.getFilteredHeroes(x)
    })
  }

  constructor(
    protected readonly apiService: DotaOfficialApiServiceService,
    private readonly filter: FilterServiceService
  ) {
  }

  protected readonly Object = Object;
}
