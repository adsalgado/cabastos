package mx.com.sharkit.service.dto;

import java.time.Instant;
import java.io.Serializable;

/**
 * A DTO for the {@link mx.com.sharkit.domain.ProductoImagen} entity.
 */
public class ProductoImagenDTO implements Serializable {
    
    private Long id;

    private Instant fechaAlta;


    private Long usuarioAltaId;

    private Long productoId;

    private Long adjuntoId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public Long getUsuarioAltaId() {
        return usuarioAltaId;
    }

    public void setUsuarioAltaId(Long userId) {
        this.usuarioAltaId = userId;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Long getAdjuntoId() {
        return adjuntoId;
    }

    public void setAdjuntoId(Long adjuntoId) {
        this.adjuntoId = adjuntoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductoImagenDTO)) {
            return false;
        }

        return id != null && id.equals(((ProductoImagenDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductoImagenDTO{" +
            "id=" + getId() +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", usuarioAltaId=" + getUsuarioAltaId() +
            ", productoId=" + getProductoId() +
            ", adjuntoId=" + getAdjuntoId() +
            "}";
    }
}
