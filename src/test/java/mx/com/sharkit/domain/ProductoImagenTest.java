package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class ProductoImagenTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductoImagen.class);
        ProductoImagen productoImagen1 = new ProductoImagen();
        productoImagen1.setId(1L);
        ProductoImagen productoImagen2 = new ProductoImagen();
        productoImagen2.setId(productoImagen1.getId());
        assertThat(productoImagen1).isEqualTo(productoImagen2);
        productoImagen2.setId(2L);
        assertThat(productoImagen1).isNotEqualTo(productoImagen2);
        productoImagen1.setId(null);
        assertThat(productoImagen1).isNotEqualTo(productoImagen2);
    }
}
