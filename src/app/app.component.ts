import {Component, OnDestroy} from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import {Timer} from './share/Timer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy  {

  // tslint:disable-next-line:variable-name
  private readonly _startTime: number;
  // tslint:disable-next-line:variable-name
  private _currentState: Timer;
  // tslint:disable-next-line:variable-name
  private _workTimer: Subscription | undefined;
  // tslint:disable-next-line:variable-name
  private _waitTimer: Subscription | undefined;
  // tslint:disable-next-line:variable-name
  private _isClicked: boolean;
  public timer: number;

  constructor() {
    this._startTime = 0;
    this.timer = this._startTime;
    this._isClicked = false;
    this._currentState = Timer.Stopped;
  }

  run(): void {
    switch (this._currentState) {
      case Timer.Stopped:
        this._currentState = Timer.Working;
        this._workTimer = interval(1000).subscribe(() => {
          this.timer++;
        });
        break;
      case Timer.Working:
        this.stop();
    }
  }

  wait(): void {
    if (!this._isClicked) {
      this._isClicked = true;
      this._waitTimer = timer(300).subscribe(() => {
        this._isClicked = false;
        // @ts-ignore
        this._waitTimer.unsubscribe();
      });
    } else {
      // @ts-ignore
      this._waitTimer.unsubscribe();
      this._isClicked = false;
      this.stop();
    }
  }

  reset(): void {
    this.stop();
    this.timer = this._startTime;
  }

  private stop(): void {
    if (this._workTimer) {
      this._workTimer.unsubscribe();
    }
    this._currentState = Timer.Stopped;
  }

  ngOnDestroy(): void {
    if (this._workTimer) {
      this._workTimer.unsubscribe();
      delete this._workTimer;
    }
    if (this._waitTimer) {
      this._waitTimer.unsubscribe();
      delete this._waitTimer;
    }
  }
  // Time(){
  //   const hour = Math.floor(this.secondsStart / (60 * 60));
  //   const minute = Math.floor((this.secondsStart - hour * 60 * 60) / 60);
  //   const second = this.secondsStart - hour * 60 * 60 - minute * 60;
  //
  //   const toZeroFirst = (x: number) => ('0' + x).slice(-2);
  //
  //   this.hour = toZeroFirst(hour);
  //   this.minute = toZeroFirst(minute);
  //   this.second = toZeroFirst(second);
  // }
  // switchStart() {
  //   if (this.time) {
  //     this.stop();
  //   } else {
  //     this.start();
  //   }
  // }
  // start() {
  //   this.interval = setInterval(() => {
  //     this.secondsStart++;
  //     this.Time();
  //   }, 1000);
  //   this.time = true;
  // }
  // reset() {
  //   this.secondsStart = 0;
  //   this.Time();
  // }
  // pause() {
  //   clearInterval(this.interval);
  //   this.time = false;
  //   this.Time();
  // }
  // stop() {
  //   clearInterval(this.interval);
  //   this.secondsStart = 0;
  //   this.Time();
  //   this.time = false;
  //   return;
  // }



}
