import {Component, OnInit} from '@angular/core';
import {Hero} from "../../Interfaces/DotaHero";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {ErrorPageComponent} from "../error-page/error-page.component";

@Component({
  selector: 'app-hero-detail-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ErrorPageComponent
  ],
  templateUrl: './hero-detail-page.component.html',
  styleUrl: './hero-detail-page.component.css'
})
export class HeroDetailPageComponent implements OnInit {
  public hero$: Observable<Hero | null> | undefined;

  constructor(
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.hero$ = this.route.data.pipe(
      map(data => data['hero'])
    );
  }

}
