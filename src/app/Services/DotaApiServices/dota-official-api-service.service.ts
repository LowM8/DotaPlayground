import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hero, Heroes} from "../../../Interfaces/DotaHero";
import {map, Observable, of} from "rxjs";

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

  public getHeroById(id: string|null): Observable<Hero | null> {
    if (!id){
      return of(null)
    }

    const heroId = parseInt(id, 10);
    if (isNaN(heroId)) {
      return of(null);
    }

    return this.heroesCall().pipe(
      map(heroes => {
        const heroFound = Object.values(heroes).find(hero => hero.id === heroId)
        return heroFound || null
      })
    )
  }
}
