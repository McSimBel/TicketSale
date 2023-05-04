import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../services/testing/observable-example.service";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingsService} from "../../services/settings/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  // private subjectScope: Subject<string>;
  // settingsData: Subscription;
  // settingsDataSubject: Subscription;
  // private subjectUnsubscribe: Subscription;
  private subjectForUnsubscribe = new Subject();

  constructor(private testing: ObservableExampleService,
              private settingsService: SettingsService) { }

  isTabCaching: boolean = false;

  ngOnInit(): void {
    // this.subjectScope = this.testing.getSubject();
    //
    // const myObservable = this.testing.getObservable();
    //
    // const unsubscribe = myObservable.subscribe((data) => {
    //   console.log('observer data', data)
    // })
    // unsubscribe.unsubscribe()
    //
    // this.subjectUnsubscribe = this.subjectScope.subscribe((data) => {
    //   console.log('data2 Subject', data)
    // });
    // setTimeout(()=>{
    //   this.subjectScope.next('subject value');
    // },3000)



    //settings data observable
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data)
    });

    //settings data subject
    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data from subject', data)
    });

    //pipe(take(n)) - позволяет контролировать утечку памяти, без отписки, данные будут приходить только n-нное кол-во раз
    // this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable().pipe(take(1)).subscribe((data) => {
    //     console.log('settings data from subject', data)
    //   })
  }
  ngOnDestroy(): void {
    // this.subjectUnsubscribe.unsubscribe();
    // this.settingsData.unsubscribe();
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

}
