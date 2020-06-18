package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class CarritoHistoricoDetalleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarritoHistoricoDetalle.class);
        CarritoHistoricoDetalle carritoHistoricoDetalle1 = new CarritoHistoricoDetalle();
        carritoHistoricoDetalle1.setId(1L);
        CarritoHistoricoDetalle carritoHistoricoDetalle2 = new CarritoHistoricoDetalle();
        carritoHistoricoDetalle2.setId(carritoHistoricoDetalle1.getId());
        assertThat(carritoHistoricoDetalle1).isEqualTo(carritoHistoricoDetalle2);
        carritoHistoricoDetalle2.setId(2L);
        assertThat(carritoHistoricoDetalle1).isNotEqualTo(carritoHistoricoDetalle2);
        carritoHistoricoDetalle1.setId(null);
        assertThat(carritoHistoricoDetalle1).isNotEqualTo(carritoHistoricoDetalle2);
    }
}
