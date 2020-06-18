import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InventarioHistoricoService } from 'app/entities/inventario-historico/inventario-historico.service';
import { IInventarioHistorico, InventarioHistorico } from 'app/shared/model/inventario-historico.model';
import { TipoMovimiento } from 'app/shared/model/enumerations/tipo-movimiento.model';

describe('Service Tests', () => {
  describe('InventarioHistorico Service', () => {
    let injector: TestBed;
    let service: InventarioHistoricoService;
    let httpMock: HttpTestingController;
    let elemDefault: IInventarioHistorico;
    let expectedResult: IInventarioHistorico | IInventarioHistorico[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InventarioHistoricoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new InventarioHistorico(0, TipoMovimiento.ENTRADA, 0, 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaMovimiento: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a InventarioHistorico', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaMovimiento: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaMovimiento: currentDate,
          },
          returnedFromService
        );

        service.create(new InventarioHistorico()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InventarioHistorico', () => {
        const returnedFromService = Object.assign(
          {
            tipoMovimiento: 'BBBBBB',
            cantidad: 1,
            totalAnterior: 1,
            totalFinal: 1,
            fechaMovimiento: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaMovimiento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of InventarioHistorico', () => {
        const returnedFromService = Object.assign(
          {
            tipoMovimiento: 'BBBBBB',
            cantidad: 1,
            totalAnterior: 1,
            totalFinal: 1,
            fechaMovimiento: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaMovimiento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a InventarioHistorico', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
