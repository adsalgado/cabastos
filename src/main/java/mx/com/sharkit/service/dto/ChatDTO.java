package mx.com.sharkit.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link mx.com.sharkit.domain.Chat} entity.
 */
public class ChatDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Size(max = 512)
    private String mensaje;

    @NotNull
    private Instant fecha;


    private Long usuarioFuenteId;

    private Long usuarioDestinoId;

    private Long adjuntoId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public Instant getFecha() {
        return fecha;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Long getUsuarioFuenteId() {
        return usuarioFuenteId;
    }

    public void setUsuarioFuenteId(Long userId) {
        this.usuarioFuenteId = userId;
    }

    public Long getUsuarioDestinoId() {
        return usuarioDestinoId;
    }

    public void setUsuarioDestinoId(Long userId) {
        this.usuarioDestinoId = userId;
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
        if (!(o instanceof ChatDTO)) {
            return false;
        }

        return id != null && id.equals(((ChatDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ChatDTO{" +
            "id=" + getId() +
            ", mensaje='" + getMensaje() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", usuarioFuenteId=" + getUsuarioFuenteId() +
            ", usuarioDestinoId=" + getUsuarioDestinoId() +
            ", adjuntoId=" + getAdjuntoId() +
            "}";
    }
}
