import { Moment } from 'moment';

export interface DateInterface {
  day: Moment;
  label: string;
  today: boolean;
  disabled: boolean;
  selected: boolean;
  first: boolean;
  last: boolean;
  between: boolean;
}