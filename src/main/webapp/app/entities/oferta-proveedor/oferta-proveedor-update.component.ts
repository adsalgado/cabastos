import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOfertaProveedor, OfertaProveedor } from 'app/shared/model/oferta-proveedor.model';
import { OfertaProveedorService } from './oferta-proveedor.service';
import { IProveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from 'app/entities/proveedor/proveedor.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';
import { IEstatus } from 'app/shared/model/estatus.model';
import { EstatusService } from 'app/entities/estatus/estatus.service';
import { ITipoOferta } from 'app/shared/model/tipo-oferta.model';
import { TipoOfertaService } from 'app/entities/tipo-oferta/tipo-oferta.service';

type SelectableEntity = IProveedor | IProducto | IEstatus | ITipoOferta;

@Component({
  selector: 'jhi-oferta-proveedor-update',
  templateUrl: './oferta-proveedor-update.component.html',
})
export class OfertaProveedorUpdateComponent implements OnInit {
  isSaving = false;
  proveedors: IProveedor[] = [];
  productos: IProducto[] = [];
  estatuses: IEstatus[] = [];
  tipoofertas: ITipoOferta[] = [];
  fechaInicioDp: any;
  fechaFinDp: any;

  editForm = this.fb.group({
    id: [],
    fechaInicio: [],
    fechaFin: [],
    proveedorId: [],
    productoId: [],
    estatusId: [],
    tipoOfertaId: [],
  });

  constructor(
    protected ofertaProveedorService: OfertaProveedorService,
    protected proveedorService: ProveedorService,
    protected productoService: ProductoService,
    protected estatusService: EstatusService,
    protected tipoOfertaService: TipoOfertaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ofertaProveedor }) => {
      this.updateForm(ofertaProveedor);

      this.proveedorService.query().subscribe((res: HttpResponse<IProveedor[]>) => (this.proveedors = res.body || []));

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));

      this.estatusService.query().subscribe((res: HttpResponse<IEstatus[]>) => (this.estatuses = res.body || []));

      this.tipoOfertaService.query().subscribe((res: HttpResponse<ITipoOferta[]>) => (this.tipoofertas = res.body || []));
    });
  }

  updateForm(ofertaProveedor: IOfertaProveedor): void {
    this.editForm.patchValue({
      id: ofertaProveedor.id,
      fechaInicio: ofertaProveedor.fechaInicio,
      fechaFin: ofertaProveedor.fechaFin,
      proveedorId: ofertaProveedor.proveedorId,
      productoId: ofertaProveedor.productoId,
      estatusId: ofertaProveedor.estatusId,
      tipoOfertaId: ofertaProveedor.tipoOfertaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ofertaProveedor = this.createFromForm();
    if (ofertaProveedor.id !== undefined) {
      this.subscribeToSaveResponse(this.ofertaProveedorService.update(ofertaProveedor));
    } else {
      this.subscribeToSaveResponse(this.ofertaProveedorService.create(ofertaProveedor));
    }
  }

  private createFromForm(): IOfertaProveedor {
    return {
      ...new OfertaProveedor(),
      id: this.editForm.get(['id'])!.value,
      fechaInicio: this.editForm.get(['fechaInicio'])!.value,
      fechaFin: this.editForm.get(['fechaFin'])!.value,
      proveedorId: this.editForm.get(['proveedorId'])!.value,
      productoId: this.editForm.get(['productoId'])!.value,
      estatusId: this.editForm.get(['estatusId'])!.value,
      tipoOfertaId: this.editForm.get(['tipoOfertaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOfertaProveedor>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
