import { Component } from '@angular/core';
import {interval,Observable, timer} from "rxjs";
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-timer';
  hour: string = '00';
  minute: string = '00';
  second: string = '00';
  secondsStart: number = 0;
  interval: any;
  time: boolean = false;

  constructor() {}
  ngOnInit(): void {}

  Time(){
    let hour = Math.floor(this.secondsStart / (60 * 60));
    let minute = Math.floor((this.secondsStart - hour * 60 * 60) / 60);
    let second = this.secondsStart - hour * 60 * 60 - minute * 60;

    let toZeroFirst = (x: number) => ('0' + x).slice(-2);

    this.hour = toZeroFirst(hour);
    this.minute = toZeroFirst(minute);
    this.second = toZeroFirst(second);
  }
  switchStart() {
    if (this.time) {
      this.stop();
    } else {
      this.start();
    }
  }
  start() {
    this.interval = setInterval(() => {
      this.secondsStart++;
      this.Time();
    }, 1000);
    this.time = true;
  }
  reset() {
    this.secondsStart = 0;
    this.Time();
  }
  pause() {
    clearInterval(this.interval);
    this.time = false;
    this.Time();
  }
  stop() {
    clearInterval(this.interval);
    this.secondsStart =0;
    this.Time();
    this.time = false;
    return;
  }



}
