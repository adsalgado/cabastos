import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarritoHistoricoDetalleService } from 'app/entities/carrito-historico-detalle/carrito-historico-detalle.service';
import { ICarritoHistoricoDetalle, CarritoHistoricoDetalle } from 'app/shared/model/carrito-historico-detalle.model';

describe('Service Tests', () => {
  describe('CarritoHistoricoDetalle Service', () => {
    let injector: TestBed;
    let service: CarritoHistoricoDetalleService;
    let httpMock: HttpTestingController;
    let elemDefault: ICarritoHistoricoDetalle;
    let expectedResult: ICarritoHistoricoDetalle | ICarritoHistoricoDetalle[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CarritoHistoricoDetalleService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new CarritoHistoricoDetalle(0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CarritoHistoricoDetalle', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CarritoHistoricoDetalle()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CarritoHistoricoDetalle', () => {
        const returnedFromService = Object.assign(
          {
            cantidad: 1,
            precio: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CarritoHistoricoDetalle', () => {
        const returnedFromService = Object.assign(
          {
            cantidad: 1,
            precio: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CarritoHistoricoDetalle', () => {
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
