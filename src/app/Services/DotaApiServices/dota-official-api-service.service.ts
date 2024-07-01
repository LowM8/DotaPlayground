import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Heroes} from "../../../Interfaces/DotaHero";

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
}
