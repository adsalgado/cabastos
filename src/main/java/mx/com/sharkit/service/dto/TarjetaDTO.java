package mx.com.sharkit.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link mx.com.sharkit.domain.Tarjeta} entity.
 */
public class TarjetaDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Size(max = 20)
    private String numeroTarjeta;

    @NotNull
    @Size(max = 10)
    private String fechaCaducidad;

    @NotNull
    @Size(max = 3)
    private String numeroSeguridad;

    @NotNull
    private LocalDate fechaAlta;


    private Long clienteId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroTarjeta() {
        return numeroTarjeta;
    }

    public void setNumeroTarjeta(String numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public String getFechaCaducidad() {
        return fechaCaducidad;
    }

    public void setFechaCaducidad(String fechaCaducidad) {
        this.fechaCaducidad = fechaCaducidad;
    }

    public String getNumeroSeguridad() {
        return numeroSeguridad;
    }

    public void setNumeroSeguridad(String numeroSeguridad) {
        this.numeroSeguridad = numeroSeguridad;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
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
        if (!(o instanceof TarjetaDTO)) {
            return false;
        }

        return id != null && id.equals(((TarjetaDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TarjetaDTO{" +
            "id=" + getId() +
            ", numeroTarjeta='" + getNumeroTarjeta() + "'" +
            ", fechaCaducidad='" + getFechaCaducidad() + "'" +
            ", numeroSeguridad='" + getNumeroSeguridad() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", clienteId=" + getClienteId() +
            "}";
    }
}
