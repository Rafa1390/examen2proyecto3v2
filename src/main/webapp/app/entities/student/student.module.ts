import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Examen2Proyecto3V2SharedModule } from 'app/shared/shared.module';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
import { StudentUpdateComponent } from './student-update.component';
import { StudentDeletePopupComponent, StudentDeleteDialogComponent } from './student-delete-dialog.component';
import { studentRoute, studentPopupRoute } from './student.route';

const ENTITY_STATES = [...studentRoute, ...studentPopupRoute];

@NgModule({
  imports: [Examen2Proyecto3V2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StudentComponent,
    StudentDetailComponent,
    StudentUpdateComponent,
    StudentDeleteDialogComponent,
    StudentDeletePopupComponent
  ],
  entryComponents: [StudentDeleteDialogComponent]
})
export class Examen2Proyecto3V2StudentModule {}
