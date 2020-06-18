package mx.com.sharkit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 128)
    @Column(name = "nombre", length = 128, nullable = false)
    private String nombre;

    @NotNull
    @Size(max = 128)
    @Column(name = "apellido_paterno", length = 128, nullable = false)
    private String apellidoPaterno;

    @NotNull
    @Size(max = 128)
    @Column(name = "email", length = 128, nullable = false)
    private String email;

    @NotNull
    @Size(max = 10)
    @Column(name = "telefono", length = 10, nullable = false)
    private String telefono;

    @Column(name = "fecha_alta")
    private Instant fechaAlta;

    @Column(name = "fecha_modificacion")
    private Instant fechaModificacion;

    @OneToOne
    @JoinColumn(unique = true)
    private User usuarioAlta;

    @OneToOne
    @JoinColumn(unique = true)
    private User usuarioModificacion;

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Tarjeta> tarjetas = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Direccion> direccions = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<CarritoCompra> carritoCompras = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<CarritoHistorico> carritoHistoricos = new HashSet<>();

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Pedido> pedidos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "clientes", allowSetters = true)
    private Estatus estatus;

    @ManyToOne
    @JsonIgnoreProperties(value = "clientes", allowSetters = true)
    private Empresa empresa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Cliente nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public Cliente apellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
        return this;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getEmail() {
        return email;
    }

    public Cliente email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public Cliente telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Instant getFechaAlta() {
        return fechaAlta;
    }

    public Cliente fechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
        return this;
    }

    public void setFechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public Instant getFechaModificacion() {
        return fechaModificacion;
    }

    public Cliente fechaModificacion(Instant fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
        return this;
    }

    public void setFechaModificacion(Instant fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public User getUsuarioAlta() {
        return usuarioAlta;
    }

    public Cliente usuarioAlta(User user) {
        this.usuarioAlta = user;
        return this;
    }

    public void setUsuarioAlta(User user) {
        this.usuarioAlta = user;
    }

    public User getUsuarioModificacion() {
        return usuarioModificacion;
    }

    public Cliente usuarioModificacion(User user) {
        this.usuarioModificacion = user;
        return this;
    }

    public void setUsuarioModificacion(User user) {
        this.usuarioModificacion = user;
    }

    public Set<Tarjeta> getTarjetas() {
        return tarjetas;
    }

    public Cliente tarjetas(Set<Tarjeta> tarjetas) {
        this.tarjetas = tarjetas;
        return this;
    }

    public Cliente addTarjeta(Tarjeta tarjeta) {
        this.tarjetas.add(tarjeta);
        tarjeta.setCliente(this);
        return this;
    }

    public Cliente removeTarjeta(Tarjeta tarjeta) {
        this.tarjetas.remove(tarjeta);
        tarjeta.setCliente(null);
        return this;
    }

    public void setTarjetas(Set<Tarjeta> tarjetas) {
        this.tarjetas = tarjetas;
    }

    public Set<Direccion> getDireccions() {
        return direccions;
    }

    public Cliente direccions(Set<Direccion> direccions) {
        this.direccions = direccions;
        return this;
    }

    public Cliente addDireccion(Direccion direccion) {
        this.direccions.add(direccion);
        direccion.setCliente(this);
        return this;
    }

    public Cliente removeDireccion(Direccion direccion) {
        this.direccions.remove(direccion);
        direccion.setCliente(null);
        return this;
    }

    public void setDireccions(Set<Direccion> direccions) {
        this.direccions = direccions;
    }

    public Set<CarritoCompra> getCarritoCompras() {
        return carritoCompras;
    }

    public Cliente carritoCompras(Set<CarritoCompra> carritoCompras) {
        this.carritoCompras = carritoCompras;
        return this;
    }

    public Cliente addCarritoCompra(CarritoCompra carritoCompra) {
        this.carritoCompras.add(carritoCompra);
        carritoCompra.setCliente(this);
        return this;
    }

    public Cliente removeCarritoCompra(CarritoCompra carritoCompra) {
        this.carritoCompras.remove(carritoCompra);
        carritoCompra.setCliente(null);
        return this;
    }

    public void setCarritoCompras(Set<CarritoCompra> carritoCompras) {
        this.carritoCompras = carritoCompras;
    }

    public Set<CarritoHistorico> getCarritoHistoricos() {
        return carritoHistoricos;
    }

    public Cliente carritoHistoricos(Set<CarritoHistorico> carritoHistoricos) {
        this.carritoHistoricos = carritoHistoricos;
        return this;
    }

    public Cliente addCarritoHistorico(CarritoHistorico carritoHistorico) {
        this.carritoHistoricos.add(carritoHistorico);
        carritoHistorico.setCliente(this);
        return this;
    }

    public Cliente removeCarritoHistorico(CarritoHistorico carritoHistorico) {
        this.carritoHistoricos.remove(carritoHistorico);
        carritoHistorico.setCliente(null);
        return this;
    }

    public void setCarritoHistoricos(Set<CarritoHistorico> carritoHistoricos) {
        this.carritoHistoricos = carritoHistoricos;
    }

    public Set<Pedido> getPedidos() {
        return pedidos;
    }

    public Cliente pedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
        return this;
    }

    public Cliente addPedido(Pedido pedido) {
        this.pedidos.add(pedido);
        pedido.setCliente(this);
        return this;
    }

    public Cliente removePedido(Pedido pedido) {
        this.pedidos.remove(pedido);
        pedido.setCliente(null);
        return this;
    }

    public void setPedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
    }

    public Estatus getEstatus() {
        return estatus;
    }

    public Cliente estatus(Estatus estatus) {
        this.estatus = estatus;
        return this;
    }

    public void setEstatus(Estatus estatus) {
        this.estatus = estatus;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public Cliente empresa(Empresa empresa) {
        this.empresa = empresa;
        return this;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellidoPaterno='" + getApellidoPaterno() + "'" +
            ", email='" + getEmail() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", fechaModificacion='" + getFechaModificacion() + "'" +
            "}";
    }
}
