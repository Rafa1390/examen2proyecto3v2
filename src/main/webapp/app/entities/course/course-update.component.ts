import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student/student.service';
import { IProfessor } from 'app/shared/model/professor.model';
import { ProfessorService } from 'app/entities/professor/professor.service';
import { IPeriod } from 'app/shared/model/period.model';
import { PeriodService } from 'app/entities/period/period.service';

@Component({
  selector: 'jhi-course-update',
  templateUrl: './course-update.component.html'
})
export class CourseUpdateComponent implements OnInit {
  isSaving: boolean;

  students: IStudent[];

  professors: IProfessor[];

  periods: IPeriod[];

  editForm = this.fb.group({
    id: [],
    name: [],
    state: [],
    students: [],
    professors: [],
    periods: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected courseService: CourseService,
    protected studentService: StudentService,
    protected professorService: ProfessorService,
    protected periodService: PeriodService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);
    });
    this.studentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStudent[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStudent[]>) => response.body)
      )
      .subscribe((res: IStudent[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.professorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProfessor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProfessor[]>) => response.body)
      )
      .subscribe((res: IProfessor[]) => (this.professors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.periodService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPeriod[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPeriod[]>) => response.body)
      )
      .subscribe((res: IPeriod[]) => (this.periods = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(course: ICourse) {
    this.editForm.patchValue({
      id: course.id,
      name: course.name,
      state: course.state,
      students: course.students,
      professors: course.professors,
      periods: course.periods
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const course = this.createFromForm();
    if (course.id !== undefined) {
      this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  private createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      state: this.editForm.get(['state']).value,
      students: this.editForm.get(['students']).value,
      professors: this.editForm.get(['professors']).value,
      periods: this.editForm.get(['periods']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackStudentById(index: number, item: IStudent) {
    return item.id;
  }

  trackProfessorById(index: number, item: IProfessor) {
    return item.id;
  }

  trackPeriodById(index: number, item: IPeriod) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
