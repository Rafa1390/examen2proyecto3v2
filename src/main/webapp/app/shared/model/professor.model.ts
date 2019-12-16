import { Moment } from 'moment';
import { ICourse } from 'app/shared/model/course.model';

export interface IProfessor {
  id?: number;
  name?: string;
  surname?: string;
  secondSurname?: string;
  sex?: string;
  birthdate?: Moment;
  hiringDate?: Moment;
  courses?: ICourse[];
}

export class Professor implements IProfessor {
  constructor(
    public id?: number,
    public name?: string,
    public surname?: string,
    public secondSurname?: string,
    public sex?: string,
    public birthdate?: Moment,
    public hiringDate?: Moment,
    public courses?: ICourse[]
  ) {}
}
