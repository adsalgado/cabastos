package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class PedidoDetalleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PedidoDetalle.class);
        PedidoDetalle pedidoDetalle1 = new PedidoDetalle();
        pedidoDetalle1.setId(1L);
        PedidoDetalle pedidoDetalle2 = new PedidoDetalle();
        pedidoDetalle2.setId(pedidoDetalle1.getId());
        assertThat(pedidoDetalle1).isEqualTo(pedidoDetalle2);
        pedidoDetalle2.setId(2L);
        assertThat(pedidoDetalle1).isNotEqualTo(pedidoDetalle2);
        pedidoDetalle1.setId(null);
        assertThat(pedidoDetalle1).isNotEqualTo(pedidoDetalle2);
    }
}
