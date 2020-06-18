package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class HistoricoPedidoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoricoPedidoDTO.class);
        HistoricoPedidoDTO historicoPedidoDTO1 = new HistoricoPedidoDTO();
        historicoPedidoDTO1.setId(1L);
        HistoricoPedidoDTO historicoPedidoDTO2 = new HistoricoPedidoDTO();
        assertThat(historicoPedidoDTO1).isNotEqualTo(historicoPedidoDTO2);
        historicoPedidoDTO2.setId(historicoPedidoDTO1.getId());
        assertThat(historicoPedidoDTO1).isEqualTo(historicoPedidoDTO2);
        historicoPedidoDTO2.setId(2L);
        assertThat(historicoPedidoDTO1).isNotEqualTo(historicoPedidoDTO2);
        historicoPedidoDTO1.setId(null);
        assertThat(historicoPedidoDTO1).isNotEqualTo(historicoPedidoDTO2);
    }
}
