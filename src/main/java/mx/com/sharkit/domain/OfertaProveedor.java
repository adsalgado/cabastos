package mx.com.sharkit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A OfertaProveedor.
 */
@Entity
@Table(name = "oferta_proveedor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class OfertaProveedor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @ManyToOne
    @JsonIgnoreProperties(value = "ofertaProveedors", allowSetters = true)
    private Proveedor proveedor;

    @ManyToOne
    @JsonIgnoreProperties(value = "ofertaProveedors", allowSetters = true)
    private Producto producto;

    @ManyToOne
    @JsonIgnoreProperties(value = "ofertaProveedors", allowSetters = true)
    private Estatus estatus;

    @ManyToOne
    @JsonIgnoreProperties(value = "ofertaProveedors", allowSetters = true)
    private TipoOferta tipoOferta;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public OfertaProveedor fechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public OfertaProveedor fechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public OfertaProveedor proveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
        return this;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }

    public Producto getProducto() {
        return producto;
    }

    public OfertaProveedor producto(Producto producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Estatus getEstatus() {
        return estatus;
    }

    public OfertaProveedor estatus(Estatus estatus) {
        this.estatus = estatus;
        return this;
    }

    public void setEstatus(Estatus estatus) {
        this.estatus = estatus;
    }

    public TipoOferta getTipoOferta() {
        return tipoOferta;
    }

    public OfertaProveedor tipoOferta(TipoOferta tipoOferta) {
        this.tipoOferta = tipoOferta;
        return this;
    }

    public void setTipoOferta(TipoOferta tipoOferta) {
        this.tipoOferta = tipoOferta;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OfertaProveedor)) {
            return false;
        }
        return id != null && id.equals(((OfertaProveedor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OfertaProveedor{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            "}";
    }
}
