import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInventario, Inventario } from 'app/shared/model/inventario.model';
import { InventarioService } from './inventario.service';
import { IProveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from 'app/entities/proveedor/proveedor.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';

type SelectableEntity = IProveedor | IProducto;

@Component({
  selector: 'jhi-inventario-update',
  templateUrl: './inventario-update.component.html',
})
export class InventarioUpdateComponent implements OnInit {
  isSaving = false;
  proveedors: IProveedor[] = [];
  productos: IProducto[] = [];

  editForm = this.fb.group({
    id: [],
    total: [null, [Validators.required]],
    proveedorId: [],
    productoId: [],
  });

  constructor(
    protected inventarioService: InventarioService,
    protected proveedorService: ProveedorService,
    protected productoService: ProductoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inventario }) => {
      this.updateForm(inventario);

      this.proveedorService.query().subscribe((res: HttpResponse<IProveedor[]>) => (this.proveedors = res.body || []));

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));
    });
  }

  updateForm(inventario: IInventario): void {
    this.editForm.patchValue({
      id: inventario.id,
      total: inventario.total,
      proveedorId: inventario.proveedorId,
      productoId: inventario.productoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inventario = this.createFromForm();
    if (inventario.id !== undefined) {
      this.subscribeToSaveResponse(this.inventarioService.update(inventario));
    } else {
      this.subscribeToSaveResponse(this.inventarioService.create(inventario));
    }
  }

  private createFromForm(): IInventario {
    return {
      ...new Inventario(),
      id: this.editForm.get(['id'])!.value,
      total: this.editForm.get(['total'])!.value,
      proveedorId: this.editForm.get(['proveedorId'])!.value,
      productoId: this.editForm.get(['productoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInventario>>): void {
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
