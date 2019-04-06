export class Calendar {
  currentDate: Date;
  selectedDate: Date;
  currentYear: number;
  currentMonth: number;
  daysInMonthPerWeek: DaysInMonthPerWeekMap;
}

interface DaysInMonthPerWeekMap {
  [weekInYear: string]: Array<Date>;
}
