import {Injectable} from '@angular/core';
import {Heroes} from "../../Interfaces/DotaHero";
import {map, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DotaOfficialApiServiceService} from "./DotaApiServices/dota-official-api-service.service";

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly dotaApiCall: DotaOfficialApiServiceService
  ) {
  }

  public findHeroesByName(searchValue: string) {
    return this.dotaApiCall.heroesCall().pipe(
      map(x => {
        const matchedHeroes: Heroes = {};
        Object.entries(x).forEach(([key, hero]) => {
          if (this.fuzzySearch(searchValue, hero.localized_name)) {
            matchedHeroes[key] = hero;
          }
        })
        return matchedHeroes;
      })
    )
  }

  public getSearchedHeroes() {
    return this.activeRoute.queryParams.pipe(
      switchMap(params => {
        if (params['search']) {
          return this.findHeroesByName(params['search']);
        }
        return this.dotaApiCall.heroesCall();
      })
    )
  }

  public fuzzySearch(pattern: string, str: string): boolean {
    str = str.toLowerCase();
    pattern = pattern.toLowerCase();
    pattern = pattern.replace(/[^a-z]/g, '');
    pattern = ".*" + pattern.split("").join(".*") + ".*";
    const re = new RegExp(pattern);
    return re.test(str);
  }
}
