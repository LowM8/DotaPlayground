import {Routes} from '@angular/router';
import {LandingPageComponent} from "./landingpage/landing-page.component";
import {HeroDetailPageComponent} from "./hero-detail-page/hero-detail-page.component";
import {HeroResolver} from "./hero-resolver.resolver";

export const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "hero/:heroId",
    component: HeroDetailPageComponent,
    resolve: {
      hero: HeroResolver
    }
  }
];
