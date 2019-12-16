import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Examen2Proyecto3V2SharedModule } from 'app/shared/shared.module';
import { ProfessorComponent } from './professor.component';
import { ProfessorDetailComponent } from './professor-detail.component';
import { ProfessorUpdateComponent } from './professor-update.component';
import { ProfessorDeletePopupComponent, ProfessorDeleteDialogComponent } from './professor-delete-dialog.component';
import { professorRoute, professorPopupRoute } from './professor.route';

const ENTITY_STATES = [...professorRoute, ...professorPopupRoute];

@NgModule({
  imports: [Examen2Proyecto3V2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProfessorComponent,
    ProfessorDetailComponent,
    ProfessorUpdateComponent,
    ProfessorDeleteDialogComponent,
    ProfessorDeletePopupComponent
  ],
  entryComponents: [ProfessorDeleteDialogComponent]
})
export class Examen2Proyecto3V2ProfessorModule {}
