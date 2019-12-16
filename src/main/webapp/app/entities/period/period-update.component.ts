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
import { IPeriod, Period } from 'app/shared/model/period.model';
import { PeriodService } from './period.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';

@Component({
  selector: 'jhi-period-update',
  templateUrl: './period-update.component.html'
})
export class PeriodUpdateComponent implements OnInit {
  isSaving: boolean;

  courses: ICourse[];
  startDateDp: any;
  endingDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    startDate: [],
    endingDate: [],
    state: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected periodService: PeriodService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ period }) => {
      this.updateForm(period);
    });
    this.courseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICourse[]>) => response.body)
      )
      .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(period: IPeriod) {
    this.editForm.patchValue({
      id: period.id,
      name: period.name,
      startDate: period.startDate,
      endingDate: period.endingDate,
      state: period.state
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const period = this.createFromForm();
    if (period.id !== undefined) {
      this.subscribeToSaveResponse(this.periodService.update(period));
    } else {
      this.subscribeToSaveResponse(this.periodService.create(period));
    }
  }

  private createFromForm(): IPeriod {
    return {
      ...new Period(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      startDate: this.editForm.get(['startDate']).value,
      endingDate: this.editForm.get(['endingDate']).value,
      state: this.editForm.get(['state']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriod>>) {
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
