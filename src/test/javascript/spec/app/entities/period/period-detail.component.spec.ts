import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Examen2Proyecto3V2TestModule } from '../../../test.module';
import { PeriodDetailComponent } from 'app/entities/period/period-detail.component';
import { Period } from 'app/shared/model/period.model';

describe('Component Tests', () => {
  describe('Period Management Detail Component', () => {
    let comp: PeriodDetailComponent;
    let fixture: ComponentFixture<PeriodDetailComponent>;
    const route = ({ data: of({ period: new Period(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Examen2Proyecto3V2TestModule],
        declarations: [PeriodDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PeriodDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PeriodDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.period).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
