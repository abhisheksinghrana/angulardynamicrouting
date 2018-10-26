import { WeekActionType } from '../enums/week-action-type.enum';

export interface ICalendarNavigation {
  isAllowed: boolean;
  actionType?: WeekActionType;
  startDate?: string;
}
