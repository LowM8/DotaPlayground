import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hero, Heroes, role} from "../../../Interfaces/DotaHero";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DotaOfficialApiServiceService {

  constructor(
    private http: HttpClient
  ) {
  }

  public heroesCall() {
    return this.http.get<Heroes>('https://api.opendota.com/api/constants/heroes')
  }

  public getAllRoles(): string[] {
    return ["Carry", "Escape", "Nuker", "Initiator", "Durable", "Disabler", "Support", "Pusher"]
  }

  public getHeroById(id : string) {
    return this.heroesCall().pipe(
      map(heroes => {
        Object.values(heroes).forEach(hero => {
          if (hero.id === parseInt(id)){
            return hero
          }
          return (): Hero => {

          }
        })
      })
    )
  }
}
