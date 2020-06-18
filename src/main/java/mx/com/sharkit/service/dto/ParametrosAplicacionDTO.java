package mx.com.sharkit.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link mx.com.sharkit.domain.ParametrosAplicacion} entity.
 */
public class ParametrosAplicacionDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 128)
    private String clave;

    @Size(max = 256)
    private String descripcion;


    private Long adjuntoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ParametrosAplicacionDTO parametrosAplicacionDTO = (ParametrosAplicacionDTO) o;
        if (parametrosAplicacionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parametrosAplicacionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParametrosAplicacionDTO{" +
            "id=" + getId() +
            ", clave='" + getClave() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", adjunto=" + getAdjuntoId() +
            "}";
    }
}
