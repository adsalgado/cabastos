package mx.com.sharkit.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import mx.com.sharkit.domain.enumeration.TipoMovimiento;

/**
 * A DTO for the {@link mx.com.sharkit.domain.InventarioHistorico} entity.
 */
public class InventarioHistoricoDTO implements Serializable {
    
    private Long id;

    @NotNull
    private TipoMovimiento tipoMovimiento;

    @NotNull
    private BigDecimal cantidad;

    @NotNull
    private BigDecimal totalAnterior;

    @NotNull
    private BigDecimal totalFinal;

    @NotNull
    private Instant fechaMovimiento;


    private Long usuarioMovimientoId;

    private Long inventarioId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoMovimiento getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(TipoMovimiento tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getTotalAnterior() {
        return totalAnterior;
    }

    public void setTotalAnterior(BigDecimal totalAnterior) {
        this.totalAnterior = totalAnterior;
    }

    public BigDecimal getTotalFinal() {
        return totalFinal;
    }

    public void setTotalFinal(BigDecimal totalFinal) {
        this.totalFinal = totalFinal;
    }

    public Instant getFechaMovimiento() {
        return fechaMovimiento;
    }

    public void setFechaMovimiento(Instant fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento;
    }

    public Long getUsuarioMovimientoId() {
        return usuarioMovimientoId;
    }

    public void setUsuarioMovimientoId(Long userId) {
        this.usuarioMovimientoId = userId;
    }

    public Long getInventarioId() {
        return inventarioId;
    }

    public void setInventarioId(Long inventarioId) {
        this.inventarioId = inventarioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InventarioHistoricoDTO)) {
            return false;
        }

        return id != null && id.equals(((InventarioHistoricoDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InventarioHistoricoDTO{" +
            "id=" + getId() +
            ", tipoMovimiento='" + getTipoMovimiento() + "'" +
            ", cantidad=" + getCantidad() +
            ", totalAnterior=" + getTotalAnterior() +
            ", totalFinal=" + getTotalFinal() +
            ", fechaMovimiento='" + getFechaMovimiento() + "'" +
            ", usuarioMovimientoId=" + getUsuarioMovimientoId() +
            ", inventarioId=" + getInventarioId() +
            "}";
    }
}
