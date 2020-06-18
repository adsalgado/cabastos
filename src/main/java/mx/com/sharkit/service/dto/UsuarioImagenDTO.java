package mx.com.sharkit.service.dto;

import java.time.Instant;
import java.io.Serializable;

/**
 * A DTO for the {@link mx.com.sharkit.domain.UsuarioImagen} entity.
 */
public class UsuarioImagenDTO implements Serializable {
    
    private Long id;

    private Instant fechaAlta;


    private Long usuarioId;

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

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long userId) {
        this.usuarioId = userId;
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
        if (!(o instanceof UsuarioImagenDTO)) {
            return false;
        }

        return id != null && id.equals(((UsuarioImagenDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UsuarioImagenDTO{" +
            "id=" + getId() +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", usuarioId=" + getUsuarioId() +
            ", adjuntoId=" + getAdjuntoId() +
            "}";
    }
}
