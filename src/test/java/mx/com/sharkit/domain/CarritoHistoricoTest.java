package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class CarritoHistoricoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarritoHistorico.class);
        CarritoHistorico carritoHistorico1 = new CarritoHistorico();
        carritoHistorico1.setId(1L);
        CarritoHistorico carritoHistorico2 = new CarritoHistorico();
        carritoHistorico2.setId(carritoHistorico1.getId());
        assertThat(carritoHistorico1).isEqualTo(carritoHistorico2);
        carritoHistorico2.setId(2L);
        assertThat(carritoHistorico1).isNotEqualTo(carritoHistorico2);
        carritoHistorico1.setId(null);
        assertThat(carritoHistorico1).isNotEqualTo(carritoHistorico2);
    }
}
