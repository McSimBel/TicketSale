import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketService} from "../../../services/ticket/ticket.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})

export class AsideComponent implements OnInit, AfterViewInit{
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  tourDefaultDate = new Date();
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'},
  ]

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();

  constructor(private messageService: MessageService,
              private settingsService: SettingsService,
              private ticketService: TicketService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }
  ngAfterViewInit() {
    // this.ticketService.updateTour({date: this.tourDefaultDate.toString()})
  }
  changeType(ev: {ev: Event, value: IMenuType}): void {
    this.updateMenuType.emit(ev.value);
  }
  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }
  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
  }
  initRestError(): void {
    this.ticketService.getError().subscribe({
        next:(data)=> {},
        error: (err) => {
          this.messageService.add({severity:'error', summary:'Ошибка: '+ err});
          console.log('err1', err)
        },
        complete: () => {}
      });
  }
  initSettingsData(): void{
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    })
  }

  initTours(): void {
    this.http.post<ITour[]>("http://127.0.0.1:3000/tours/", {}).subscribe((data) => {
      this.ticketService.updateTicketList(data);
    });
  }

  deleteTours(): void {
    this.http.delete("http://127.0.0.1:3000/tours/remove").subscribe((data) => {
      this.ticketService.updateTicketList([]);
    });
  }
}
