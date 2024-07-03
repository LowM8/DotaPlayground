import {
  Component,
  ElementRef,
  EventEmitter, OnDestroy,
  OnInit,
  Output,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {DotaOfficialApiServiceService} from "../Services/DotaApiServices/dota-official-api-service.service";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FilterServiceService} from "../Services/filter-service.service";

@Component({
  selector: 'app-filter-window',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './filter-window.component.html',
  styleUrl: './filter-window.component.css'
})
export class FilterWindowComponent implements OnInit, OnDestroy {
  @Output() public showFilter = new EventEmitter<boolean>(true);
  @ViewChild('tag', {static: true}) public tag!: ElementRef;

  public tags = this.dotaAPI.getAllRoles()
  public activeTagsSignal: WritableSignal<string[]> = signal([]);
  public disabledTagsSignal: WritableSignal<string[]> = signal(this.tags)
  private sub$!: Subscription;
  private documentEventListener!: EventListener;

  constructor(
    private readonly dotaAPI: DotaOfficialApiServiceService,
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly filter: FilterServiceService
  ) {
  }

  ngOnInit(): void {
    this.documentEventListener = (event) => {
      if (!this.tag.nativeElement.contains(event.target)) {
        this.closeComponent();
      }
    }
    document.addEventListener('click', this.documentEventListener)
    this.sub$ = this.filter.getFilters().subscribe(tags => {
      tags.forEach(tag => {
        if (this.tags.includes(tag)) {
          this.activateTag(tag)
        }
      })
    })
  }

  private setFilter(filter: string[]) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: filter.length > 0 ? {tags: filter.join(",")} : {tags: null},
      queryParamsHandling: 'merge',
      preserveFragment: true,
    })
  }

  activateTag(tag: string) {
    this.swapSignals(this.activeTagsSignal, this.disabledTagsSignal, tag);
  }

  disableTag(tag: string) {
    this.swapSignals(this.disabledTagsSignal, this.activeTagsSignal, tag);
  }

  private swapSignals(signalAdd: WritableSignal<string[]>, signalRemove: WritableSignal<string[]>, content: string) {
    signalRemove.update(values => {
      return values.filter(value => value !== content)
    })
    signalAdd.update(values => {
      if (!values.includes(content)) {
        return [...values, content]
      }
      return values
    })
  }

  public closeComponent() {
    this.setFilter(this.activeTagsSignal())
    this.showFilter.emit(false);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
    document.removeEventListener('click', this.documentEventListener);
  }
}
