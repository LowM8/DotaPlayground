import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Heroes} from "../../Interfaces/DotaHero";
import {SearchServiceService} from "./search-service.service";

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly search: SearchServiceService
  ) {
  }

  public getFilters(): Observable<string[]> {
    return this.activeRoute.queryParams.pipe(
      map(params => {
        if (params['tags']) {
          return params['tags'].split(",")
        }
        return []
      })
    )
  }

  public getFilteredHeroes(values: string[]) {
    return this.search.getSearchedHeroes().pipe(
      map(heroes => {
        let matchedHeroes: Heroes = {}
        if (values.length === 0){
          return heroes
        }
        Object.entries(heroes).forEach(([key, hero]) => {
          let tags: string[] = [...hero.roles]
          let matched = 0
          values.forEach(value => {
            if (tags.includes(value)) {
              matched++
            }
            if (matched === values.length) {
              matchedHeroes[key] = hero
            }
          })
        })
        return matchedHeroes
      })
    )
  }
}
