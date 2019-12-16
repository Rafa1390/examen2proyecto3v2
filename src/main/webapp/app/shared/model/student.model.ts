import { Moment } from 'moment';
import { ICourse } from 'app/shared/model/course.model';

export interface IStudent {
  id?: number;
  name?: string;
  surname?: string;
  secondSurname?: string;
  sex?: string;
  birthdate?: Moment;
  courses?: ICourse[];
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public secondSurname?: string,
    public sex?: string,
    public birthdate?: Moment,
    public courses?: ICourse[]
  ) {}
}
