import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AbastosTestModule } from '../../../test.module';
import { InventarioHistoricoComponent } from 'app/entities/inventario-historico/inventario-historico.component';
import { InventarioHistoricoService } from 'app/entities/inventario-historico/inventario-historico.service';
import { InventarioHistorico } from 'app/shared/model/inventario-historico.model';

describe('Component Tests', () => {
  describe('InventarioHistorico Management Component', () => {
    let comp: InventarioHistoricoComponent;
    let fixture: ComponentFixture<InventarioHistoricoComponent>;
    let service: InventarioHistoricoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AbastosTestModule],
        declarations: [InventarioHistoricoComponent],
      })
        .overrideTemplate(InventarioHistoricoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InventarioHistoricoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InventarioHistoricoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InventarioHistorico(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.inventarioHistoricos && comp.inventarioHistoricos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
