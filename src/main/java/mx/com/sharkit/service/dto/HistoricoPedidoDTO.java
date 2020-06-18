package mx.com.sharkit.service.dto;

import java.time.LocalDate;
import java.io.Serializable;

/**
 * A DTO for the {@link mx.com.sharkit.domain.HistoricoPedido} entity.
 */
public class HistoricoPedidoDTO implements Serializable {
    
    private Long id;

    private LocalDate fechaEstatus;


    private Long pedidoId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaEstatus() {
        return fechaEstatus;
    }

    public void setFechaEstatus(LocalDate fechaEstatus) {
        this.fechaEstatus = fechaEstatus;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistoricoPedidoDTO)) {
            return false;
        }

        return id != null && id.equals(((HistoricoPedidoDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HistoricoPedidoDTO{" +
            "id=" + getId() +
            ", fechaEstatus='" + getFechaEstatus() + "'" +
            ", pedidoId=" + getPedidoId() +
            "}";
    }
}
