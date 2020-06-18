import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITransportistaTarifa, TransportistaTarifa } from 'app/shared/model/transportista-tarifa.model';
import { TransportistaTarifaService } from './transportista-tarifa.service';
import { ITransportista } from 'app/shared/model/transportista.model';
import { TransportistaService } from 'app/entities/transportista/transportista.service';

@Component({
  selector: 'jhi-transportista-tarifa-update',
  templateUrl: './transportista-tarifa-update.component.html',
})
export class TransportistaTarifaUpdateComponent implements OnInit {
  isSaving = false;
  transportistas: ITransportista[] = [];

  editForm = this.fb.group({
    id: [],
    rangoMinimo: [null, [Validators.required]],
    rangoMaximo: [null, [Validators.required]],
    precio: [null, [Validators.required]],
    transportistaId: [],
  });

  constructor(
    protected transportistaTarifaService: TransportistaTarifaService,
    protected transportistaService: TransportistaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transportistaTarifa }) => {
      this.updateForm(transportistaTarifa);

      this.transportistaService.query().subscribe((res: HttpResponse<ITransportista[]>) => (this.transportistas = res.body || []));
    });
  }

  updateForm(transportistaTarifa: ITransportistaTarifa): void {
    this.editForm.patchValue({
      id: transportistaTarifa.id,
      rangoMinimo: transportistaTarifa.rangoMinimo,
      rangoMaximo: transportistaTarifa.rangoMaximo,
      precio: transportistaTarifa.precio,
      transportistaId: transportistaTarifa.transportistaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transportistaTarifa = this.createFromForm();
    if (transportistaTarifa.id !== undefined) {
      this.subscribeToSaveResponse(this.transportistaTarifaService.update(transportistaTarifa));
    } else {
      this.subscribeToSaveResponse(this.transportistaTarifaService.create(transportistaTarifa));
    }
  }

  private createFromForm(): ITransportistaTarifa {
    return {
      ...new TransportistaTarifa(),
      id: this.editForm.get(['id'])!.value,
      rangoMinimo: this.editForm.get(['rangoMinimo'])!.value,
      rangoMaximo: this.editForm.get(['rangoMaximo'])!.value,
      precio: this.editForm.get(['precio'])!.value,
      transportistaId: this.editForm.get(['transportistaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransportistaTarifa>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITransportista): any {
    return item.id;
  }
}
