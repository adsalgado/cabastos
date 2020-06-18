package mx.com.sharkit.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link mx.com.sharkit.domain.CarritoHistoricoDetalle} entity.
 */
public class CarritoHistoricoDetalleDTO implements Serializable {
    
    private Long id;

    @NotNull
    private BigDecimal cantidad;

    private BigDecimal precio;


    private Long productoId;

    private Long carritoHistoricoId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Long getCarritoHistoricoId() {
        return carritoHistoricoId;
    }

    public void setCarritoHistoricoId(Long carritoHistoricoId) {
        this.carritoHistoricoId = carritoHistoricoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CarritoHistoricoDetalleDTO)) {
            return false;
        }

        return id != null && id.equals(((CarritoHistoricoDetalleDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CarritoHistoricoDetalleDTO{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", precio=" + getPrecio() +
            ", productoId=" + getProductoId() +
            ", carritoHistoricoId=" + getCarritoHistoricoId() +
            "}";
    }
}
