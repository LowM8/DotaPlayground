import {Component, input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Hero} from "../../Interfaces/DotaHero";
import {FilterServiceService} from "../Services/filter-service.service";
import {DotaOfficialApiServiceService} from "../Services/DotaApiServices/dota-official-api-service.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-hero-detail-page',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './hero-detail-page.component.html',
  styleUrl: './hero-detail-page.component.css'
})
export class HeroDetailPageComponent implements OnInit{
  public heroId = input.required<string>();
  public hero$!: Observable<Hero> | Observable<void>;

  constructor(
    private readonly dotaApiService: DotaOfficialApiServiceService
  ) {
  }
  ngOnInit(): void {
    this.hero$ = this.dotaApiService.getHeroById(this.heroId())
  }


}
