package mx.com.sharkit.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link mx.com.sharkit.domain.Notificacion} entity.
 */
public class NotificacionDTO implements Serializable {
    
    private Long id;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NotificacionDTO)) {
            return false;
        }

        return id != null && id.equals(((NotificacionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NotificacionDTO{" +
            "id=" + getId() +
            "}";
    }
}
