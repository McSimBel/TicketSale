import {Directive, ElementRef, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document: keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective {
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number = 0;
  $event: KeyboardEvent;

  constructor(private el: ElementRef) { }

  ngOnInit(): void{}

  ngAfterViewInit() {
    this.activeElementIndex = 0;

    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        // if (this.items[0]) {
        //   (this.items[0] as HTMLElement).setAttribute('style', 'border: 1px solid red; transform: translateY(-1px); box-shadow: 3px 5px 10px rgba(0,0,0,.3);')
        // }
      }
    } else {
      console.error('Не передан селектор')}
    setTimeout(() => {
      this.renderComplete.emit(true);
    })
  }

  ngOnChanges(data: SimpleChanges){}

  initKeyUp(ev: KeyboardEvent): void{
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if (ev.key === 'ArrowRight') {
      if (this.index < this.items.length - 1) {
        this.index++
      }
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 1px solid red; transform: translateY(-1px); box-shadow: 3px 5px 10px rgba(0,0,0,.3);')
      }
    } else if (ev.key === 'ArrowLeft') {
      if (this.index > 0) {
        this.index--
      }
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 1px solid red; transform: translateY(-1px); box-shadow: 3px 5px 10px rgba(0,0,0,.3);')
      }
    } else if (ev.key === 'ArrowDown') {
      if (this.index < this.items.length - 3) {
        this.index = this.index + 3
      }
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 1px solid red; transform: translateY(-1px); box-shadow: 3px 5px 10px rgba(0,0,0,.3);')
      }
    } else if (ev.key === 'ArrowUp') {
      if (this.index > 2) {
        this.index = this.index - 3
      } else this.index = 0;
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 1px solid red; transform: translateY(-1px); box-shadow: 3px 5px 10px rgba(0,0,0,.3);')
      }
    }
    this.activeElementIndex = this.index;
    this.items[this.index].scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
  }
  initStyle(index: number) {
    this.index = index;
    if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 1px solid red; transform: translateY(-1px); box-shadow: 3px 5px 10px rgba(0,0,0,.3);')
    }
  }
  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }

}
