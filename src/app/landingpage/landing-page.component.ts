import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AsyncPipe, NgOptimizedImage, NgStyle} from "@angular/common";
import {Heroes} from "../../Interfaces/DotaHero";
import {SearchComponent} from "../search/search.component";
import {SearchServiceService} from "../Services/search-service.service";
import {FilterComponent} from "../filter/filter.component";
import {FilterServiceService} from "../Services/filter-service.service";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    SearchComponent,
    NgStyle,
    FilterComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  public heroes$!: Observable<Heroes>
  public preUrlImg: string = "https://cdn.akamai.steamstatic.com"
  public filters$ = this.filter.getFilters()
  public filters!: string[];

  ngOnInit(): void {
    this.filters$.subscribe(x => {
      this.heroes$ = this.filter.getFilteredHeroes(x)
    })
  }

  constructor(
    private readonly searchService: SearchServiceService,
    private readonly filter: FilterServiceService
  ) {
  }

  public createImageUrl(url: string): string {
    return this.preUrlImg + url;
  }

  protected readonly Object = Object;
}
