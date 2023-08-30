import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public searchTerm: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(600)
      )
      .subscribe( value => (
        this.searchTerm.emit( value )
        ));
      }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  onKeyPress( searchTerm: string): void {
    this.debouncer.next( searchTerm );
  }


  search(): void {
    this.searchTerm.emit(this.txtInput.nativeElement.value);
  }
}
