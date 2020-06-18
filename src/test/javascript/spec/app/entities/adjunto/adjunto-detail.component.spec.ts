import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { AbastosTestModule } from '../../../test.module';
import { AdjuntoDetailComponent } from 'app/entities/adjunto/adjunto-detail.component';
import { Adjunto } from 'app/shared/model/adjunto.model';

describe('Component Tests', () => {
  describe('Adjunto Management Detail Component', () => {
    let comp: AdjuntoDetailComponent;
    let fixture: ComponentFixture<AdjuntoDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ adjunto: new Adjunto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AbastosTestModule],
        declarations: [AdjuntoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AdjuntoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdjuntoDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load adjunto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.adjunto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
