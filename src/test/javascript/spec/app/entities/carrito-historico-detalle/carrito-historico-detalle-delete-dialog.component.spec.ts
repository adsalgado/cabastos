import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AbastosTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { CarritoHistoricoDetalleDeleteDialogComponent } from 'app/entities/carrito-historico-detalle/carrito-historico-detalle-delete-dialog.component';
import { CarritoHistoricoDetalleService } from 'app/entities/carrito-historico-detalle/carrito-historico-detalle.service';

describe('Component Tests', () => {
  describe('CarritoHistoricoDetalle Management Delete Component', () => {
    let comp: CarritoHistoricoDetalleDeleteDialogComponent;
    let fixture: ComponentFixture<CarritoHistoricoDetalleDeleteDialogComponent>;
    let service: CarritoHistoricoDetalleService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AbastosTestModule],
        declarations: [CarritoHistoricoDetalleDeleteDialogComponent],
      })
        .overrideTemplate(CarritoHistoricoDetalleDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CarritoHistoricoDetalleDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarritoHistoricoDetalleService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
