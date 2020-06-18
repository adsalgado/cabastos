import {ElementSelectionService} from './../../../../../app/element-selection.service';
import {ComponentInspectorService} from './../../../../../app/component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInventarioHistorico, InventarioHistorico } from 'app/shared/model/inventario-historico.model';
import { InventarioHistoricoService } from './inventario-historico.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IInventario } from 'app/shared/model/inventario.model';
import { InventarioService } from 'app/entities/inventario/inventario.service';

type SelectableEntity = IUser | IInventario;

@Component({
  selector: 'jhi-inventario-historico-update',
  templateUrl: './inventario-historico-update.component.html',
})
export class InventarioHistoricoUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  inventarios: IInventario[] = [];

  editForm = this.fb.group({
    id: [],
    tipoMovimiento: [null, [Validators.required]],
    cantidad: [null, [Validators.required]],
    totalAnterior: [null, [Validators.required]],
    totalFinal: [null, [Validators.required]],
    fechaMovimiento: [null, [Validators.required]],
    usuarioMovimientoId: [],
    inventarioId: [],
  });

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

    protected inventarioHistoricoService: InventarioHistoricoService,
    protected userService: UserService,
    protected inventarioService: InventarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {this.__componentInspectorService.getComp(this);
}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inventarioHistorico }) => {
      if (!inventarioHistorico.id) {
        const today = moment().startOf('day');
        inventarioHistorico.fechaMovimiento = today;
      }

      this.updateForm(inventarioHistorico);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.inventarioService.query().subscribe((res: HttpResponse<IInventario[]>) => (this.inventarios = res.body || []));
    });
  }

  updateForm(inventarioHistorico: IInventarioHistorico): void {
    this.editForm.patchValue({
      id: inventarioHistorico.id,
      tipoMovimiento: inventarioHistorico.tipoMovimiento,
      cantidad: inventarioHistorico.cantidad,
      totalAnterior: inventarioHistorico.totalAnterior,
      totalFinal: inventarioHistorico.totalFinal,
      fechaMovimiento: inventarioHistorico.fechaMovimiento ? inventarioHistorico.fechaMovimiento.format(DATE_TIME_FORMAT) : null,
      usuarioMovimientoId: inventarioHistorico.usuarioMovimientoId,
      inventarioId: inventarioHistorico.inventarioId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inventarioHistorico = this.createFromForm();
    if (inventarioHistorico.id !== undefined) {
      this.subscribeToSaveResponse(this.inventarioHistoricoService.update(inventarioHistorico));
    } else {
      this.subscribeToSaveResponse(this.inventarioHistoricoService.create(inventarioHistorico));
    }
  }

  private createFromForm(): IInventarioHistorico {
    return {
      ...new InventarioHistorico(),
      id: this.editForm.get(['id'])!.value,
      tipoMovimiento: this.editForm.get(['tipoMovimiento'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      totalAnterior: this.editForm.get(['totalAnterior'])!.value,
      totalFinal: this.editForm.get(['totalFinal'])!.value,
      fechaMovimiento: this.editForm.get(['fechaMovimiento'])!.value
        ? moment(this.editForm.get(['fechaMovimiento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      usuarioMovimientoId: this.editForm.get(['usuarioMovimientoId'])!.value,
      inventarioId: this.editForm.get(['inventarioId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInventarioHistorico>>): void {
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
