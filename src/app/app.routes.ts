import {Routes} from '@angular/router';
import {LandingPageComponent} from "./landingpage/landing-page.component";
import {SearchComponent} from "./search/search.component";

export const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "test",
    component: SearchComponent
  }
];
