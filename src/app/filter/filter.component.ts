import {Component} from '@angular/core';
import {FilterWindowComponent} from "../filter-window/filter-window.component";
import {ActivatedRoute, Router} from "@angular/router";
import {relative} from "@angular/compiler-cli";

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  imports: [
    FilterWindowComponent
  ],
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  public showTagWindow: boolean = false;


  public showTags(): void {
    if (this.showTagWindow) {
      this.showTagWindow = false
      return;
    }
    this.showTagWindow = true
  }
}
