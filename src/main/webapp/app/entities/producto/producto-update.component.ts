import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProducto, Producto } from 'app/shared/model/producto.model';
import { ProductoService } from './producto.service';
import { IAdjunto } from 'app/shared/model/adjunto.model';
import { AdjuntoService } from 'app/entities/adjunto/adjunto.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from 'app/entities/proveedor/proveedor.service';
import { ITipoArticulo } from 'app/shared/model/tipo-articulo.model';
import { TipoArticuloService } from 'app/entities/tipo-articulo/tipo-articulo.service';
import { ICategoria } from 'app/shared/model/categoria.model';
import { CategoriaService } from 'app/entities/categoria/categoria.service';
import { ISeccion } from 'app/shared/model/seccion.model';
import { SeccionService } from 'app/entities/seccion/seccion.service';
import { IEstatus } from 'app/shared/model/estatus.model';
import { EstatusService } from 'app/entities/estatus/estatus.service';
import { IUnidadMedida } from 'app/shared/model/unidad-medida.model';
import { UnidadMedidaService } from 'app/entities/unidad-medida/unidad-medida.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa/empresa.service';

type SelectableEntity = IAdjunto | IUser | IProveedor | ITipoArticulo | ICategoria | ISeccion | IEstatus | IUnidadMedida | IEmpresa;

@Component({
  selector: 'jhi-producto-update',
  templateUrl: './producto-update.component.html',
})
export class ProductoUpdateComponent implements OnInit {
  isSaving = false;
  adjuntos: IAdjunto[] = [];
  users: IUser[] = [];
  proveedors: IProveedor[] = [];
  tipoarticulos: ITipoArticulo[] = [];
  categorias: ICategoria[] = [];
  seccions: ISeccion[] = [];
  estatuses: IEstatus[] = [];
  unidadmedidas: IUnidadMedida[] = [];
  empresas: IEmpresa[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.maxLength(256)]],
    descripcion: [null, [Validators.required, Validators.maxLength(512)]],
    caracteristicas: [null, [Validators.required, Validators.maxLength(512)]],
    precioSinIva: [null, [Validators.required]],
    precio: [null, [Validators.required]],
    fechaAlta: [],
    fechaModificacion: [],
    adjuntoId: [],
    usuarioAltaId: [],
    usuarioModificacionId: [],
    proveedorId: [],
    tipoArticuloId: [],
    categoriaId: [],
    seccionId: [],
    estatusId: [],
    unidadMedidaId: [],
    empresaId: [],
  });

  constructor(
    protected productoService: ProductoService,
    protected adjuntoService: AdjuntoService,
    protected userService: UserService,
    protected proveedorService: ProveedorService,
    protected tipoArticuloService: TipoArticuloService,
    protected categoriaService: CategoriaService,
    protected seccionService: SeccionService,
    protected estatusService: EstatusService,
    protected unidadMedidaService: UnidadMedidaService,
    protected empresaService: EmpresaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ producto }) => {
      if (!producto.id) {
        const today = moment().startOf('day');
        producto.fechaAlta = today;
        producto.fechaModificacion = today;
      }

      this.updateForm(producto);

      this.adjuntoService
        .query({ filter: 'producto-is-null' })
        .pipe(
          map((res: HttpResponse<IAdjunto[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAdjunto[]) => {
          if (!producto.adjuntoId) {
            this.adjuntos = resBody;
          } else {
            this.adjuntoService
              .find(producto.adjuntoId)
              .pipe(
                map((subRes: HttpResponse<IAdjunto>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAdjunto[]) => (this.adjuntos = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.proveedorService.query().subscribe((res: HttpResponse<IProveedor[]>) => (this.proveedors = res.body || []));

      this.tipoArticuloService.query().subscribe((res: HttpResponse<ITipoArticulo[]>) => (this.tipoarticulos = res.body || []));

      this.categoriaService.query().subscribe((res: HttpResponse<ICategoria[]>) => (this.categorias = res.body || []));

      this.seccionService.query().subscribe((res: HttpResponse<ISeccion[]>) => (this.seccions = res.body || []));

      this.estatusService.query().subscribe((res: HttpResponse<IEstatus[]>) => (this.estatuses = res.body || []));

      this.unidadMedidaService.query().subscribe((res: HttpResponse<IUnidadMedida[]>) => (this.unidadmedidas = res.body || []));

      this.empresaService.query().subscribe((res: HttpResponse<IEmpresa[]>) => (this.empresas = res.body || []));
    });
  }

  updateForm(producto: IProducto): void {
    this.editForm.patchValue({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      caracteristicas: producto.caracteristicas,
      precioSinIva: producto.precioSinIva,
      precio: producto.precio,
      fechaAlta: producto.fechaAlta ? producto.fechaAlta.format(DATE_TIME_FORMAT) : null,
      fechaModificacion: producto.fechaModificacion ? producto.fechaModificacion.format(DATE_TIME_FORMAT) : null,
      adjuntoId: producto.adjuntoId,
      usuarioAltaId: producto.usuarioAltaId,
      usuarioModificacionId: producto.usuarioModificacionId,
      proveedorId: producto.proveedorId,
      tipoArticuloId: producto.tipoArticuloId,
      categoriaId: producto.categoriaId,
      seccionId: producto.seccionId,
      estatusId: producto.estatusId,
      unidadMedidaId: producto.unidadMedidaId,
      empresaId: producto.empresaId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const producto = this.createFromForm();
    if (producto.id !== undefined) {
      this.subscribeToSaveResponse(this.productoService.update(producto));
    } else {
      this.subscribeToSaveResponse(this.productoService.create(producto));
    }
  }

  private createFromForm(): IProducto {
    return {
      ...new Producto(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      caracteristicas: this.editForm.get(['caracteristicas'])!.value,
      precioSinIva: this.editForm.get(['precioSinIva'])!.value,
      precio: this.editForm.get(['precio'])!.value,
      fechaAlta: this.editForm.get(['fechaAlta'])!.value ? moment(this.editForm.get(['fechaAlta'])!.value, DATE_TIME_FORMAT) : undefined,
      fechaModificacion: this.editForm.get(['fechaModificacion'])!.value
        ? moment(this.editForm.get(['fechaModificacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      adjuntoId: this.editForm.get(['adjuntoId'])!.value,
      usuarioAltaId: this.editForm.get(['usuarioAltaId'])!.value,
      usuarioModificacionId: this.editForm.get(['usuarioModificacionId'])!.value,
      proveedorId: this.editForm.get(['proveedorId'])!.value,
      tipoArticuloId: this.editForm.get(['tipoArticuloId'])!.value,
      categoriaId: this.editForm.get(['categoriaId'])!.value,
      seccionId: this.editForm.get(['seccionId'])!.value,
      estatusId: this.editForm.get(['estatusId'])!.value,
      unidadMedidaId: this.editForm.get(['unidadMedidaId'])!.value,
      empresaId: this.editForm.get(['empresaId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
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
