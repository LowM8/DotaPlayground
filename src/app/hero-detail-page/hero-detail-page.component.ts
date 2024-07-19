import {Component, OnInit} from '@angular/core';
import {Hero} from "../../Interfaces/DotaHero";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {map, Observable} from "rxjs";
import {ErrorPageComponent} from "../error-page/error-page.component";
import {DotaOfficialApiServiceService} from "../../Services/DotaApiServices/dota-official-api-service.service";

@Component({
  selector: 'app-hero-detail-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ErrorPageComponent,
    RouterLink
  ],
  templateUrl: './hero-detail-page.component.html',
  styleUrl: './hero-detail-page.component.scss'
})
export class HeroDetailPageComponent implements OnInit {
  public hero$: Observable<Hero | null> | undefined;
  public strengthImg: string = "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png";
  public agilityImg = "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png";
  public intelligence = "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png";


  constructor(
    private route: ActivatedRoute,
    protected apiService: DotaOfficialApiServiceService
  ) {
  }

  ngOnInit(): void {
    this.hero$ = this.route.data.pipe(
      map(data => data['hero'])
    );
  }

}
