import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransportistaTarifaService } from 'app/entities/transportista-tarifa/transportista-tarifa.service';
import { ITransportistaTarifa, TransportistaTarifa } from 'app/shared/model/transportista-tarifa.model';

describe('Service Tests', () => {
  describe('TransportistaTarifa Service', () => {
    let injector: TestBed;
    let service: TransportistaTarifaService;
    let httpMock: HttpTestingController;
    let elemDefault: ITransportistaTarifa;
    let expectedResult: ITransportistaTarifa | ITransportistaTarifa[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TransportistaTarifaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TransportistaTarifa(0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TransportistaTarifa', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TransportistaTarifa()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TransportistaTarifa', () => {
        const returnedFromService = Object.assign(
          {
            rangoMinimo: 1,
            rangoMaximo: 1,
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

      it('should return a list of TransportistaTarifa', () => {
        const returnedFromService = Object.assign(
          {
            rangoMinimo: 1,
            rangoMaximo: 1,
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

      it('should delete a TransportistaTarifa', () => {
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
