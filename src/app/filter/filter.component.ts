import {Component, OnInit} from '@angular/core';
import {FilterWindowComponent} from "../filter-window/filter-window.component";
import {FilterServiceService} from "../Services/filter-service.service";

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  imports: [
    FilterWindowComponent
  ],
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public showTagWindow: boolean = false;
  public activatedFilter: string[] = [];

  constructor(
    private readonly filter: FilterServiceService
  ) {
  }

  ngOnInit(): void {
    this.filter.getFilters().subscribe(filters => {
      this.activatedFilter = filters
    })
  }

  protected removeFilter(tag: string) {
    let newFilter: string[] = []
    this.activatedFilter.filter(filters => {
      if (filters !== tag) {
        newFilter.push(filters)
      }
    })
    this.filter.setFilter(newFilter)
  }

  public showTags(): void {
    if (this.showTagWindow) {
      this.showTagWindow = false
      return;
    }
    this.showTagWindow = true
  }

}
