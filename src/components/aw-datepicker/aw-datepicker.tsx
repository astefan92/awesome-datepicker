import { Component, Prop, State } from '@stencil/core';
import { Days } from '../models/days.enum';
import { Months } from '../models/months.enum';

import moment from 'moment';

@Component({
  tag: 'aw-datepicker',
  styleUrl: 'aw-datepicker.scss',
  shadow: true
})
export class AwDatepickerComponent {

  @Prop() minYear: number = 1919;
  @Prop() maxYear: number = 2119;

  @State() calendar: any = {
    currentDate: new Date(),
    selectedDate: new Date(),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    daysInMonthPerWeek: {}
  }

  constructor() {
    this.calendar = {
      ...this.calendar,
      daysInMonthPerWeek: this.getDaysInMonthPerWeek(this.calendar.currentYear, this.calendar.currentMonth)
    };
  }

  getDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getDaysInMonthPerWeek(year: number, month: number) {
    const daysInMonthPerWeek = this.getDaysInMonth(year, month).reduce((previousDate, currentDate) => {
      const yearWeek = year + '-' + moment(currentDate).week();
      if (typeof previousDate[yearWeek] === 'undefined') {
        previousDate[yearWeek] = [];
      }
      previousDate[yearWeek].push(currentDate);
      return previousDate;
    }, {});
    return daysInMonthPerWeek;
  }

  isEqualDate(firstDate: Date, secondDate: Date) {
    firstDate.setHours(0, 0, 0, 0);
    return firstDate.getTime() === secondDate.getTime();
  }

  getDateClasses(date: Date) {
    let baseClass = 'date';
    if (this.isEqualDate(this.calendar.currentDate, date)) {
      baseClass += ' current';
    }

    if (this.isEqualDate(this.calendar.selectedDate, date)) {
      baseClass += ' active';
    }

    return baseClass;
  }

  setDate(date: Date) {
    this.calendar = {
      ...this.calendar,
      selectedDate: date,
    };
  }

  setYear(year: number) {
    this.calendar = {
      ...this.calendar,
      currentYear: year,
      daysInMonthPerWeek: this.getDaysInMonthPerWeek(year, this.calendar.currentMonth)
    };
  }

  setMonth(month: number) {
    this.calendar = {
      ...this.calendar,
      currentMonth: month,
      daysInMonthPerWeek: this.getDaysInMonthPerWeek(this.calendar.currentYear, month)
    };
  }

  render() {
    return (
      <div class='aw-datepicker'>
        <div class='calendar'>
          <div class='row header center'>
            <div class='year'>
              {this.calendar.currentYear === this.minYear ?
                '' : <i class='arrow left' onClick={() => this.setYear(--this.calendar.currentYear)}></i>}
              {this.calendar.currentYear}
              {this.calendar.currentYear === this.maxYear ?
                '' : <i class='arrow right' onClick={() => this.setYear(++this.calendar.currentYear)}></i>}
            </div>
            <div class='selected-date'>
              {this.calendar.selectedDate.toDateString()}
            </div>
            <div class='month'>
              {this.calendar.currentMonth === Months.Jan ?
                '' : <i class='arrow left' onClick={() => this.setMonth(--this.calendar.currentMonth)}></i>}
              {Months[this.calendar.currentMonth]}
              {this.calendar.currentMonth === Months.Dec ?
                '' : <i class='arrow right' onClick={() => this.setMonth(++this.calendar.currentMonth)}></i>}
            </div>
          </div>
          <div class='row'>
            {Days.getValues().map((key) => (
              <div class='column'>
                {Days[key]}
              </div>
            ))}
          </div>
          {Object.keys(this.calendar.daysInMonthPerWeek).map((key) => {
            const days = this.calendar.daysInMonthPerWeek[key];
            let dayCount = 0;
            return (<div class='row'>
              {Days.getValues().map((dayKey) => {
                if (days[dayCount] && dayKey === days[dayCount].getDay()) {
                  const date = days[dayCount];
                  ++dayCount;
                  return (<div class='column'>
                    <p class={this.getDateClasses(date)} onClick={() => this.setDate(date)}>{date.getDate()}</p>
                  </div>);
                }
                return <div class='column'></div>;
              })}
            </div>);
          })}
        </div>
      </div>
    );
  }
}
