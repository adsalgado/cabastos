package mx.com.sharkit.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link mx.com.sharkit.domain.Seccion} entity.
 */
public class SeccionDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Size(max = 128)
    private String nombre;


    private Long empresaId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getEmpresaId() {
        return empresaId;
    }

    public void setEmpresaId(Long empresaId) {
        this.empresaId = empresaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SeccionDTO)) {
            return false;
        }

        return id != null && id.equals(((SeccionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SeccionDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", empresaId=" + getEmpresaId() +
            "}";
    }
}
