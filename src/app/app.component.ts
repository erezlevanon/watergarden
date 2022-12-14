import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AsyncSubject, BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  title = 'watergarden';

  showTitle = new BehaviorSubject(true);
  @ViewChild('displaypart') container: ElementRef;
  @ViewChild('header') header: ElementRef;
  rows = [];
  columns = [];
  readonly dropWidth = 42;
  readonly dropRightMargin = 4.55;
  readonly dropBottomMargin = 9;
  displayMarginLeft = new AsyncSubject();

  constructor(private cdRef: ChangeDetectorRef) {
  }

  hideTitle(): void {
    this.showTitle.next(false);
  }

  createDrops(): void {
    this.rows = [];
    this.columns = [];
    let iCount = 0;
    for (let i = this.dropWidth;
         i < this.container.nativeElement.offsetWidth;
         i += this.dropWidth + this.dropRightMargin) {
      this.rows.push(iCount++);
      this.displayMarginLeft.next((this.container.nativeElement.offsetWidth - i + (this.dropWidth / 2) - this.dropRightMargin * 2));
    }
    let jCount = 0;
    for (let i = this.dropWidth;
         i < this.container.nativeElement.offsetHeight;
         i += this.dropWidth + this.dropBottomMargin + 1) {
      this.columns.push(jCount++);
    }
    this.displayMarginLeft.complete();
  }

  ngAfterViewInit(): void {
    this.createDrops();
  }

  trackByFn(index: number, item): number {
    return item;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  @HostListener('window:resize', ['$event']) onResize(event): void {
    this.createDrops();
  }
}
