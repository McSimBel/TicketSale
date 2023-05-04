import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ICustomTicketData, INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {TicketService} from "../../../services/ticket/ticket.service";
import {find, forkJoin, fromEvent, map, pipe, Subscription} from "rxjs";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;
  ticketSearchValue: string;
  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3];

  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService: TicketService) { }

  ngOnInit(): void {
    // first get userInfo
    this.user = this.userService.getUser();

    // init formGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(),
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl(),
    });

    // get nearest tours
    this.uploadNearestTours();

    // params
    const  routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id'); // если использовать вариант с queryParams, см ticket-list.component.ts

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }

  ngAfterViewInit(): void {

    // setCardNumber
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((ev:any) => {
      this.initSearchTour();
    })
  }

  ngOnDestroy():void {
    this.searchTicketSub.unsubscribe();
  }

  uploadNearestTours(){
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      // console.log(data[0]);
      // console.log(data[1]);
      this.toursLocation = data[1];
      this.nearestTours = this.ticketService.transformData(data[0], data[1])
    })
    return this.nearestTours
  }

  initSearchTour(): void{
    if(!this.ticketSearchValue){
      this.uploadNearestTours();
    }
    const type = Math.floor(Math.random() * this.searchTypes.length);
    // unsubscribe
    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }

    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
    })
  }

  onSubmit(): void{}

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};

    this.ticketService.sendTourData(postData).subscribe()
  }

  selectDate(ev: Event): void {}
}
