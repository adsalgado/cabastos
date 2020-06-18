import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecolectorTarifaService } from 'app/entities/recolector-tarifa/recolector-tarifa.service';
import { IRecolectorTarifa, RecolectorTarifa } from 'app/shared/model/recolector-tarifa.model';

describe('Service Tests', () => {
  describe('RecolectorTarifa Service', () => {
    let injector: TestBed;
    let service: RecolectorTarifaService;
    let httpMock: HttpTestingController;
    let elemDefault: IRecolectorTarifa;
    let expectedResult: IRecolectorTarifa | IRecolectorTarifa[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RecolectorTarifaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new RecolectorTarifa(0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RecolectorTarifa', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new RecolectorTarifa()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RecolectorTarifa', () => {
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

      it('should return a list of RecolectorTarifa', () => {
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

      it('should delete a RecolectorTarifa', () => {
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
