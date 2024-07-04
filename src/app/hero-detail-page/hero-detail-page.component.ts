import {Component, input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Hero} from "../../Interfaces/DotaHero";
import {FilterServiceService} from "../Services/filter-service.service";
import {DotaOfficialApiServiceService} from "../Services/DotaApiServices/dota-official-api-service.service";
import {AsyncPipe} from "@angular/common";
import {toObservable} from "@angular/core/rxjs-interop";
import {ifStmt} from "@angular/compiler";

@Component({
  selector: 'app-hero-detail-page',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './hero-detail-page.component.html',
  styleUrl: './hero-detail-page.component.css'
})
export class HeroDetailPageComponent implements OnInit {
  public heroId = input.required<string>();
  public heroId$: Observable<string> = toObservable(this.heroId)
  public hero$!: Observable<Hero> | Observable<void>;

  constructor(
    private readonly dotaApiService: DotaOfficialApiServiceService
  ) {
  }

  ngOnInit(): void {
    this.heroId$.subscribe(x => {
      this.hero$ = this.dotaApiService.getHeroById(x)
    })
  }


}
