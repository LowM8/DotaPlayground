import {Routes} from '@angular/router';
import {LandingPageComponent} from "./landingpage/landing-page.component";
import {SearchComponent} from "./search/search.component";
import {HeroDetailPageComponent} from "./hero-detail-page/hero-detail-page.component";

export const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "hero/:heroId",
    component: HeroDetailPageComponent
  }
];
