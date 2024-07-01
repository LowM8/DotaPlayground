import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AsyncPipe, NgOptimizedImage, NgStyle} from "@angular/common";
import {Heroes} from "../../Interfaces/DotaHero";
import {SearchComponent} from "../search/search.component";
import {SearchServiceService} from "../Services/search-service.service";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    SearchComponent,
    NgStyle
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  public heroes$!:Observable<Heroes>
  public preUrlImg: string = "https://cdn.akamai.steamstatic.com"



  ngOnInit(): void {
    this.heroes$ = this.searchService.getSearchedHeroes()
  }

  constructor(
    private readonly searchService: SearchServiceService
  ) {
  }

  public createImageUrl(url :string):string{
    return this.preUrlImg+url;
  }

  protected readonly Object = Object;
}
