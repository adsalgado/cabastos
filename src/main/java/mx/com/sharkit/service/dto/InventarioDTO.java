package mx.com.sharkit.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link mx.com.sharkit.domain.Inventario} entity.
 */
public class InventarioDTO implements Serializable {

	private Long id;

	private ProductoProveedorDTO productoProveedor;

	private Long productoProveedorId;

	private BigDecimal total;

	private BigDecimal inventarioMinimo;

	private BigDecimal inventarioMaximo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public ProductoProveedorDTO getProductoProveedor() {
		return productoProveedor;
	}

	public void setProductoProveedor(ProductoProveedorDTO productoProveedor) {
		this.productoProveedor = productoProveedor;
	}

	public Long getProductoProveedorId() {
		return productoProveedorId;
	}

	public void setProductoProveedorId(Long productoProveedorId) {
		this.productoProveedorId = productoProveedorId;
	}

	public BigDecimal getInventarioMinimo() {
		return inventarioMinimo;
	}

	public void setInventarioMinimo(BigDecimal inventarioMinimo) {
		this.inventarioMinimo = inventarioMinimo;
	}

	public BigDecimal getInventarioMaximo() {
		return inventarioMaximo;
	}

	public void setInventarioMaximo(BigDecimal inventarioMaximo) {
		this.inventarioMaximo = inventarioMaximo;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		InventarioDTO inventarioDTO = (InventarioDTO) o;
		if (inventarioDTO.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), inventarioDTO.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "InventarioDTO [id=" + id + ", productoProveedor=" + productoProveedor + ", productoProveedorId="
				+ productoProveedorId + ", total=" + total + ", inventarioMinimo=" + inventarioMinimo
				+ ", inventarioMaximo=" + inventarioMaximo + "]";
	}

}
