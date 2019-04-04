import { Component, Prop } from '@stencil/core';
import { Days } from '../models/days.enum';

@Component({
  tag: 'aw-datepicker',
  styleUrl: 'aw-datepicker.scss',
  shadow: true
})
export class AwDatepickerComponent {

  @Prop() minYear: number = 2019;

  getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  render() {
    return (
      <div class='aw-datepicker'>
        <div class='row'>
          {Days.getValues().map((key) => (
            <div class='column'>
              {Days[key]}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
