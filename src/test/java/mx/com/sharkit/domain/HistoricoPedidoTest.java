package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class HistoricoPedidoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoricoPedido.class);
        HistoricoPedido historicoPedido1 = new HistoricoPedido();
        historicoPedido1.setId(1L);
        HistoricoPedido historicoPedido2 = new HistoricoPedido();
        historicoPedido2.setId(historicoPedido1.getId());
        assertThat(historicoPedido1).isEqualTo(historicoPedido2);
        historicoPedido2.setId(2L);
        assertThat(historicoPedido1).isNotEqualTo(historicoPedido2);
        historicoPedido1.setId(null);
        assertThat(historicoPedido1).isNotEqualTo(historicoPedido2);
    }
}
