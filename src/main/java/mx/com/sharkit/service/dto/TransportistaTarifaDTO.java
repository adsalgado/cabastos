package mx.com.sharkit.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link mx.com.sharkit.domain.TransportistaTarifa} entity.
 */
public class TransportistaTarifaDTO implements Serializable {
    
    private Long id;

    @NotNull
    private BigDecimal rangoMinimo;

    @NotNull
    private BigDecimal rangoMaximo;

    @NotNull
    private BigDecimal precio;


    private Long transportistaId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getRangoMinimo() {
        return rangoMinimo;
    }

    public void setRangoMinimo(BigDecimal rangoMinimo) {
        this.rangoMinimo = rangoMinimo;
    }

    public BigDecimal getRangoMaximo() {
        return rangoMaximo;
    }

    public void setRangoMaximo(BigDecimal rangoMaximo) {
        this.rangoMaximo = rangoMaximo;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Long getTransportistaId() {
        return transportistaId;
    }

    public void setTransportistaId(Long transportistaId) {
        this.transportistaId = transportistaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TransportistaTarifaDTO)) {
            return false;
        }

        return id != null && id.equals(((TransportistaTarifaDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TransportistaTarifaDTO{" +
            "id=" + getId() +
            ", rangoMinimo=" + getRangoMinimo() +
            ", rangoMaximo=" + getRangoMaximo() +
            ", precio=" + getPrecio() +
            ", transportistaId=" + getTransportistaId() +
            "}";
    }
}
