package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class CarritoCompraTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarritoCompra.class);
        CarritoCompra carritoCompra1 = new CarritoCompra();
        carritoCompra1.setId(1L);
        CarritoCompra carritoCompra2 = new CarritoCompra();
        carritoCompra2.setId(carritoCompra1.getId());
        assertThat(carritoCompra1).isEqualTo(carritoCompra2);
        carritoCompra2.setId(2L);
        assertThat(carritoCompra1).isNotEqualTo(carritoCompra2);
        carritoCompra1.setId(null);
        assertThat(carritoCompra1).isNotEqualTo(carritoCompra2);
    }
}
