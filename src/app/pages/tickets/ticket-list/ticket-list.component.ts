import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/ticket/ticket.service";
import {ITour} from "../../../models/tours";
import {ActivatedRoute, Router} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  ticketsCopy: ITour[];

  @ViewChild('tourWrap') tourWrap: ElementRef; // отобразится ссылка на элемент в котором шаблонная переменная

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective; // отобразится ссылка на директиву того элемента, в котором шаблонная переменная
  // @ViewChild(BlocksStyleDirective) blockDirective: BlocksStyleDirective; // можно напрямую указать директиву

  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TiсketsStorageService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);
        this.ticketsCopy = [...this.tickets];
      }
    )
  }
  ngAfterViewInit(){
    this.tourWrap
  }
  findTours(ev: Event): void {
    console.log(ev)
    const searchValue = (<HTMLInputElement>ev.target).value.toLowerCase();

    if (searchValue) {
      this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(searchValue));
    } else {
      this.tickets = [...this.ticketsCopy];
    }
  }
  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`])

    /* если использовать метод for queryParamMap
    надо в tickets-routing.module.ts заменить path: 'ticket/:id' на path: 'ticket'
    this.router.navigate([`/tickets/ticket`], {queryParams:{id:item.id}})
    */
  }
  directiveRenderComplete(ev: boolean){
    // const el: HTMLElement = this.tourWrap.nativeElement;
    // el.setAttribute('style', 'background: red') // вариант использования DOM элемента
    this.blockDirective.initStyle(0) // вариант использования директивы
  }

}
