import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICarritoCompra, CarritoCompra } from 'app/shared/model/carrito-compra.model';
import { CarritoCompraService } from './carrito-compra.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';

type SelectableEntity = ICliente | IProducto;

@Component({
  selector: 'jhi-carrito-compra-update',
  templateUrl: './carrito-compra-update.component.html',
})
export class CarritoCompraUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];
  productos: IProducto[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required]],
    precio: [],
    clienteId: [],
    productoId: [],
  });

  constructor(
    protected carritoCompraService: CarritoCompraService,
    protected clienteService: ClienteService,
    protected productoService: ProductoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carritoCompra }) => {
      this.updateForm(carritoCompra);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));
    });
  }

  updateForm(carritoCompra: ICarritoCompra): void {
    this.editForm.patchValue({
      id: carritoCompra.id,
      cantidad: carritoCompra.cantidad,
      precio: carritoCompra.precio,
      clienteId: carritoCompra.clienteId,
      productoId: carritoCompra.productoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carritoCompra = this.createFromForm();
    if (carritoCompra.id !== undefined) {
      this.subscribeToSaveResponse(this.carritoCompraService.update(carritoCompra));
    } else {
      this.subscribeToSaveResponse(this.carritoCompraService.create(carritoCompra));
    }
  }

  private createFromForm(): ICarritoCompra {
    return {
      ...new CarritoCompra(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      precio: this.editForm.get(['precio'])!.value,
      clienteId: this.editForm.get(['clienteId'])!.value,
      productoId: this.editForm.get(['productoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarritoCompra>>): void {
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
