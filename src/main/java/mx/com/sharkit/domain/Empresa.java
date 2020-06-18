package mx.com.sharkit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Empresa.
 */
@Entity
@Table(name = "empresa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Empresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 256)
    @Column(name = "nombre", length = 256, nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Cliente> clientes = new HashSet<>();

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Proveedor> proveedors = new HashSet<>();

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Recolector> recolectors = new HashSet<>();

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Transportista> transportistas = new HashSet<>();

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Producto> productos = new HashSet<>();

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Categoria> categorias = new HashSet<>();

    @OneToMany(mappedBy = "empresa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Seccion> seccions = new HashSet<>();

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

    public Empresa nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Cliente> getClientes() {
        return clientes;
    }

    public Empresa clientes(Set<Cliente> clientes) {
        this.clientes = clientes;
        return this;
    }

    public Empresa addCliente(Cliente cliente) {
        this.clientes.add(cliente);
        cliente.setEmpresa(this);
        return this;
    }

    public Empresa removeCliente(Cliente cliente) {
        this.clientes.remove(cliente);
        cliente.setEmpresa(null);
        return this;
    }

    public void setClientes(Set<Cliente> clientes) {
        this.clientes = clientes;
    }

    public Set<Proveedor> getProveedors() {
        return proveedors;
    }

    public Empresa proveedors(Set<Proveedor> proveedors) {
        this.proveedors = proveedors;
        return this;
    }

    public Empresa addProveedor(Proveedor proveedor) {
        this.proveedors.add(proveedor);
        proveedor.setEmpresa(this);
        return this;
    }

    public Empresa removeProveedor(Proveedor proveedor) {
        this.proveedors.remove(proveedor);
        proveedor.setEmpresa(null);
        return this;
    }

    public void setProveedors(Set<Proveedor> proveedors) {
        this.proveedors = proveedors;
    }

    public Set<Recolector> getRecolectors() {
        return recolectors;
    }

    public Empresa recolectors(Set<Recolector> recolectors) {
        this.recolectors = recolectors;
        return this;
    }

    public Empresa addRecolector(Recolector recolector) {
        this.recolectors.add(recolector);
        recolector.setEmpresa(this);
        return this;
    }

    public Empresa removeRecolector(Recolector recolector) {
        this.recolectors.remove(recolector);
        recolector.setEmpresa(null);
        return this;
    }

    public void setRecolectors(Set<Recolector> recolectors) {
        this.recolectors = recolectors;
    }

    public Set<Transportista> getTransportistas() {
        return transportistas;
    }

    public Empresa transportistas(Set<Transportista> transportistas) {
        this.transportistas = transportistas;
        return this;
    }

    public Empresa addTransportista(Transportista transportista) {
        this.transportistas.add(transportista);
        transportista.setEmpresa(this);
        return this;
    }

    public Empresa removeTransportista(Transportista transportista) {
        this.transportistas.remove(transportista);
        transportista.setEmpresa(null);
        return this;
    }

    public void setTransportistas(Set<Transportista> transportistas) {
        this.transportistas = transportistas;
    }

    public Set<Producto> getProductos() {
        return productos;
    }

    public Empresa productos(Set<Producto> productos) {
        this.productos = productos;
        return this;
    }

    public Empresa addProducto(Producto producto) {
        this.productos.add(producto);
        producto.setEmpresa(this);
        return this;
    }

    public Empresa removeProducto(Producto producto) {
        this.productos.remove(producto);
        producto.setEmpresa(null);
        return this;
    }

    public void setProductos(Set<Producto> productos) {
        this.productos = productos;
    }

    public Set<Categoria> getCategorias() {
        return categorias;
    }

    public Empresa categorias(Set<Categoria> categorias) {
        this.categorias = categorias;
        return this;
    }

    public Empresa addCategoria(Categoria categoria) {
        this.categorias.add(categoria);
        categoria.setEmpresa(this);
        return this;
    }

    public Empresa removeCategoria(Categoria categoria) {
        this.categorias.remove(categoria);
        categoria.setEmpresa(null);
        return this;
    }

    public void setCategorias(Set<Categoria> categorias) {
        this.categorias = categorias;
    }

    public Set<Seccion> getSeccions() {
        return seccions;
    }

    public Empresa seccions(Set<Seccion> seccions) {
        this.seccions = seccions;
        return this;
    }

    public Empresa addSeccion(Seccion seccion) {
        this.seccions.add(seccion);
        seccion.setEmpresa(this);
        return this;
    }

    public Empresa removeSeccion(Seccion seccion) {
        this.seccions.remove(seccion);
        seccion.setEmpresa(null);
        return this;
    }

    public void setSeccions(Set<Seccion> seccions) {
        this.seccions = seccions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empresa)) {
            return false;
        }
        return id != null && id.equals(((Empresa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empresa{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
