import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IProfessor, Professor } from 'app/shared/model/professor.model';
import { ProfessorService } from './professor.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';

@Component({
  selector: 'jhi-professor-update',
  templateUrl: './professor-update.component.html'
})
export class ProfessorUpdateComponent implements OnInit {
  isSaving: boolean;

  courses: ICourse[];
  birthdateDp: any;
  hiringDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    surname: [],
    secondSurname: [],
    sex: [],
    birthdate: [],
    hiringDate: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected professorService: ProfessorService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ professor }) => {
      this.updateForm(professor);
    });
    this.courseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICourse[]>) => response.body)
      )
      .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(professor: IProfessor) {
    this.editForm.patchValue({
      id: professor.id,
      name: professor.name,
      surname: professor.surname,
      secondSurname: professor.secondSurname,
      sex: professor.sex,
      birthdate: professor.birthdate,
      hiringDate: professor.hiringDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const professor = this.createFromForm();
    if (professor.id !== undefined) {
      this.subscribeToSaveResponse(this.professorService.update(professor));
    } else {
      this.subscribeToSaveResponse(this.professorService.create(professor));
    }
  }

  private createFromForm(): IProfessor {
    return {
      ...new Professor(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      surname: this.editForm.get(['surname']).value,
      secondSurname: this.editForm.get(['secondSurname']).value,
      sex: this.editForm.get(['sex']).value,
      birthdate: this.editForm.get(['birthdate']).value,
      hiringDate: this.editForm.get(['hiringDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessor>>) {
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

  trackCourseById(index: number, item: ICourse) {
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
