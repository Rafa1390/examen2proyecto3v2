import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Examen2Proyecto3V2TestModule } from '../../../test.module';
import { ProfessorDetailComponent } from 'app/entities/professor/professor-detail.component';
import { Professor } from 'app/shared/model/professor.model';

describe('Component Tests', () => {
  describe('Professor Management Detail Component', () => {
    let comp: ProfessorDetailComponent;
    let fixture: ComponentFixture<ProfessorDetailComponent>;
    const route = ({ data: of({ professor: new Professor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Examen2Proyecto3V2TestModule],
        declarations: [ProfessorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProfessorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfessorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.professor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
