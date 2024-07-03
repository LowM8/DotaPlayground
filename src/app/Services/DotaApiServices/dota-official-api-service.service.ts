import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Heroes, role} from "../../../Interfaces/DotaHero";

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
}
