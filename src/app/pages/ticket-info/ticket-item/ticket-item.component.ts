import { Component, OnInit } from '@angular/core';
import {ITour} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITour | undefined;
  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService) { }

  ngOnInit(): void {
    const  routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id'); // если использовать вариант с queryParams, см ticket-list.component.ts

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }

}
