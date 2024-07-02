import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-filter-window',
  standalone: true,
  imports: [],
  templateUrl: './filter-window.component.html',
  styleUrl: './filter-window.component.css'
})
export class FilterWindowComponent implements AfterViewInit {
  @Output() public showFilter = new EventEmitter<boolean>(true);
  @ViewChild('tag', {static: true}) public tag!: ElementRef;



  ngAfterViewInit(): void {
    document.addEventListener('click', (event) => {
      if (!this.tag.nativeElement.contains(event.target)) {
        this.closeComponent()
      }
    });
  }

  public closeComponent() {
    this.showFilter.emit(false);
  }

}
