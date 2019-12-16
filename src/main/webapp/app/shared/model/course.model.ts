import { IStudent } from 'app/shared/model/student.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { IPeriod } from 'app/shared/model/period.model';

export interface ICourse {
  id?: number;
  name?: string;
  state?: string;
  students?: IStudent[];
  professors?: IProfessor[];
  periods?: IPeriod[];
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public name?: string,
    public state?: string,
    public students?: IStudent[],
    public professors?: IProfessor[],
    public periods?: IPeriod[]
  ) {}
}
