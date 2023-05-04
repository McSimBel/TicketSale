import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigService} from "./services/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';
  prop: string;
  constructor(private testing: ObservableExampleService,
              private config: ConfigService) {
    testing.initObservable()
  }
  ngOnInit() {
    // this.config.configLoad()

    /**Observable*/
    //first subscriber
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) => {
      // console.log('first Observabledata', data)
    });
    myObservable.subscribe((data) => {
      // console.log('second Observabledata', data)
    });

    /**Subject*/
    const mySubject = this.testing.getSubject();
    // mySubject.subscribe((data) => {
    //   // console.log('first data Subject', data)
    // });
    // mySubject.subscribe((data) => {
    //   // console.log('second data Subject', data)
    // });

    //send subjectData
    mySubject.next('subject value');
    //send subjectData
    mySubject.next('subject value');

    /**BehaviorSubject*/
    const myBehaviorSubject = this.testing.getBehaviorSubject();
    myBehaviorSubject.subscribe((data) => {
      // console.log('first data BehaviorSubject', data)
    });
    myBehaviorSubject.subscribe((data) => {
      // console.log('second data BehaviorSubject', data)
    });

    //send BehaviorSubjectData
    myBehaviorSubject.next('subject value from app');
    //send BehaviorSubjectData
    myBehaviorSubject.next('subject value from app');
  }
}
