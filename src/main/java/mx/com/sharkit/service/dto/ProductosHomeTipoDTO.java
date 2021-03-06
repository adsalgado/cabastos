package mx.com.sharkit.service.dto;

import java.io.Serializable;
import java.util.List;

/**
 * Lista de productos por tipo de articulo
 * 
 * @author macpro
 *
 */
public class ProductosHomeTipoDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private List<ProductoTipoArticuloDTO> productosTipoArticulo;

	public List<ProductoTipoArticuloDTO> getProductosTipoArticulo() {
		return productosTipoArticulo;
	}

	public void setProductosTipoArticulo(List<ProductoTipoArticuloDTO> productosTipoArticulo) {
		this.productosTipoArticulo = productosTipoArticulo;
	}

	@Override
	public String toString() {
		return "ProductosHomeTipoDTO [productosTipoArticulo=" + productosTipoArticulo + "]";
	}

}
