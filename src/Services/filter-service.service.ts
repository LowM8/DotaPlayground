import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Hero, Heroes} from "../Interfaces/DotaHero";
import {SearchServiceService} from "./search-service.service";

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly search: SearchServiceService,
    private readonly router: Router
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

  public setFilter(filter: string[]) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: filter.length > 0 ? {tags: filter.join(",")} : {tags: null},
      queryParamsHandling: 'merge',
      preserveFragment: true,
    })
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
