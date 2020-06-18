package mx.com.sharkit.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link mx.com.sharkit.domain.Inventario} entity.
 */
public class InventarioDTO implements Serializable {
    
    private Long id;

    @NotNull
    private BigDecimal total;


    private Long proveedorId;

    private Long productoId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Long getProveedorId() {
        return proveedorId;
    }

    public void setProveedorId(Long proveedorId) {
        this.proveedorId = proveedorId;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InventarioDTO)) {
            return false;
        }

        return id != null && id.equals(((InventarioDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InventarioDTO{" +
            "id=" + getId() +
            ", total=" + getTotal() +
            ", proveedorId=" + getProveedorId() +
            ", productoId=" + getProductoId() +
            "}";
    }
}
