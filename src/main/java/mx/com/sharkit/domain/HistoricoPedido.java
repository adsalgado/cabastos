package mx.com.sharkit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A HistoricoPedido.
 */
@Entity
@Table(name = "historico_pedido")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class HistoricoPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_estatus")
    private LocalDate fechaEstatus;

    @ManyToOne
    @JsonIgnoreProperties(value = "historicoPedidos", allowSetters = true)
    private Pedido pedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaEstatus() {
        return fechaEstatus;
    }

    public HistoricoPedido fechaEstatus(LocalDate fechaEstatus) {
        this.fechaEstatus = fechaEstatus;
        return this;
    }

    public void setFechaEstatus(LocalDate fechaEstatus) {
        this.fechaEstatus = fechaEstatus;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public HistoricoPedido pedido(Pedido pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistoricoPedido)) {
            return false;
        }
        return id != null && id.equals(((HistoricoPedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HistoricoPedido{" +
            "id=" + getId() +
            ", fechaEstatus='" + getFechaEstatus() + "'" +
            "}";
    }
}
