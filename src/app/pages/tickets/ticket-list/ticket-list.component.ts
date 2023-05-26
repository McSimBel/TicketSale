import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TicketService} from "../../../services/ticket/ticket.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {Router} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],

})
export class TicketListComponent implements OnInit, AfterViewInit {

  tickets: ITour[] = [];
  ticketsCopy: ITour[];
  ticketsCopyFiltered: ITour[];
  inputSearch: string;
  tourUnsubscriber: Subscription;
  directiveReady = false;

  @ViewChild('tourWrap') tourWrap: ElementRef; // отобразится ссылка на элемент в котором шаблонная переменная

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective; // отобразится ссылка на директиву того элемента, в котором шаблонная переменная
  // @ViewChild(BlocksStyleDirective) blockDirective: BlocksStyleDirective; // можно напрямую указать директиву

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketSearchValue: string;
  ticketsLoad = false;

  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.ticketService.ticketUpdateSubject$.subscribe((data) => {
      this.tickets = data;
    })
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);
        this.ticketsCopy = [...this.tickets];
        this.ticketsCopyFiltered = [...this.tickets];
        this.ticketsLoad = true;
        // this.userService.setToken('user-private-token');
      }
    )
    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe(
      (data: ITourTypeSelect) => {
        console.log('data', data)

        let ticketType: string;
        switch (data.value) {
          case "single":
            this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
            break;
          case "multi":
            this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
            break;
          case "all":
            this.tickets = [...this.ticketsCopy];
            break;
        }
        // if (this.inputSearch) {
        //   this.findTours(this.inputSearch)
        // }
        this.ticketsCopyFiltered = [...this.tickets];

        if (data.date) {
          const dateWithoutTime = new Date(data.date).toISOString().split('T');
          const dateValue = dateWithoutTime[0]
          this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
        }
        setTimeout(() => {

          this.blockDirective.updateItems();
          this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
        });
      }
    );
  }

  ngAfterViewInit() {
    // this.tourWrap
    console.log('this.ticketSearch.nativeElement', this.ticketSearch.nativeElement)
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');

    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
      console.log('**')
      if (this.ticketSearchValue) {
        this.tickets = this.ticketsCopyFiltered.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue));
      } else {
        this.tickets = [...this.ticketsCopyFiltered];
      }
    })
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    // this.searchTicketSub.unsubscribe();
  }


  // findTours(ev: Event | string): void {
  //   const searchValue = typeof ev === "string" ? ev : (<HTMLInputElement>ev.target).value.toLowerCase();
  //   if (searchValue) {
  //     this.tickets = this.ticketsCopyFiltered.filter((el) => el.name.toLowerCase().includes(searchValue));
  //   } else {
  //     this.tickets = [...this.ticketsCopyFiltered];
  //   }
  //
  // }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item._id}`])

    /* если использовать метод for queryParamMap
    надо в tickets-routing.module.ts заменить path: 'ticket/:id' на path: 'ticket'
    this.router.navigate([`/tickets/ticket`], {queryParams:{id:item.id}})
    */
  }

  directiveRenderComplete(ev: boolean) {
    // const el: HTMLElement = this.tourWrap.nativeElement;
    // el.setAttribute('style', 'background: red') // вариант использования DOM элемента
    this.blockDirective.initStyle(0) // вариант использования директивы
    this.directiveReady = true;
  }
}
