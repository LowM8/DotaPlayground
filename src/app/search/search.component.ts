import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {BehaviorSubject, debounceTime} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  public searchSubject = new BehaviorSubject<string>('')
  public searchValue: string = '';

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      const search = params['search'] || '';
      this.searchValue = search;
      if (search) {
        this.searchSubject.next(search);
      }
    });
  }

  constructor(
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
  ) {
    this.searchSubject.pipe(debounceTime(550)).subscribe((searchValue) => {
      this.setSearch(searchValue)
    })
  }

  private setSearch(searchValue: string) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: searchValue ? {search: searchValue} : {search: null},
      queryParamsHandling: 'merge',
      preserveFragment: true,
    })
  }

  public handleSearch(search: string) {
    this.searchSubject.next(search)
  }


}
