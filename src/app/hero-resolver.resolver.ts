import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {Hero} from "../Interfaces/DotaHero";
import {DotaOfficialApiServiceService} from "../Services/DotaApiServices/dota-official-api-service.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class HeroResolver implements Resolve<Observable<Hero | null>> {
  constructor(private service: DotaOfficialApiServiceService, private router: Router) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Hero | null> {
    const heroId = route.paramMap.get('heroId');

    return this.service.getHeroById(heroId).pipe(
      map(hero => {
        if (hero) {
          return hero;
        } else {
          return null;
        }
      }),
      catchError(() => {
        return of(null);
      })
    );
  }
}
