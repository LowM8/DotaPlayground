import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {filter, fromEvent, map, Observable} from "rxjs";

@Component({
  selector: 'app-filter-window',
  standalone: true,
  imports: [],
  templateUrl: './filter-window.component.html',
  styleUrl: './filter-window.component.css'
})
export class FilterWindowComponent implements OnInit {

  @Output() public showFilter = new EventEmitter<boolean>(true);

  ngOnInit(): void {
    const tagElement = document.getElementById('tag');
    const click$: Observable<Event> = fromEvent(document, 'click');

    this.clickSubscription = click$.pipe(
        map(x => x.target)
    )
  }

  public closeComponent() {
    this.showFilter.emit(false);
  }

}
