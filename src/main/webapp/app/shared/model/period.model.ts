import { Moment } from 'moment';
import { ICourse } from 'app/shared/model/course.model';

export interface IPeriod {
  id?: number;
  name?: string;
  startDate?: Moment;
  endingDate?: Moment;
  state?: string;
  courses?: ICourse[];
}

export class Period implements IPeriod {
  constructor(
    public id?: number,
    public name?: string,
    public startDate?: Moment,
    public endingDate?: Moment,
    public state?: string,
    public courses?: ICourse[]
  ) {}
}
