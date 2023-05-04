import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITourTypeSelect} from "../../../models/tours";
import {TicketService} from "../../../services/ticket/ticket.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})

export class AsideComponent implements OnInit, AfterViewInit{
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();


  public menuTypes: IMenuType[];
  public selectedMenuType: IMenuType;
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ];

  constructor(private messageService: MessageService,
              private settingsService: SettingsService,
              private ticketService: TicketService) { }

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
}
