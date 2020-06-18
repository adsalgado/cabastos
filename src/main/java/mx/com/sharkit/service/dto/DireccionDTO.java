package mx.com.sharkit.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link mx.com.sharkit.domain.Direccion} entity.
 */
public class DireccionDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Size(max = 256)
    private String direccion;

    @Size(max = 100)
    private String colonia;

    @Size(max = 5)
    private String codigoPostal;

    @Size(max = 128)
    private String geolocalizacion;


    private Long clienteId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getColonia() {
        return colonia;
    }

    public void setColonia(String colonia) {
        this.colonia = colonia;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getGeolocalizacion() {
        return geolocalizacion;
    }

    public void setGeolocalizacion(String geolocalizacion) {
        this.geolocalizacion = geolocalizacion;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DireccionDTO)) {
            return false;
        }

        return id != null && id.equals(((DireccionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DireccionDTO{" +
            "id=" + getId() +
            ", direccion='" + getDireccion() + "'" +
            ", colonia='" + getColonia() + "'" +
            ", codigoPostal='" + getCodigoPostal() + "'" +
            ", geolocalizacion='" + getGeolocalizacion() + "'" +
            ", clienteId=" + getClienteId() +
            "}";
    }
}
