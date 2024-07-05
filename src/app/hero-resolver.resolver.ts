import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Hero} from "../Interfaces/DotaHero";
import {DotaOfficialApiServiceService} from "./Services/DotaApiServices/dota-official-api-service.service";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class HeroResolver implements Resolve<Observable<Hero>> {
  constructor(private service: DotaOfficialApiServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Hero>{
    const heroId = route.paramMap.get('heroId')

    let hero = this.service.getHeroById(heroId)

    if (hero){
      return hero
    }
  }
}
