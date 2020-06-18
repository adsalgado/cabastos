package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class HistoricoPedidoMapperTest {

    private HistoricoPedidoMapper historicoPedidoMapper;

    @BeforeEach
    public void setUp() {
        historicoPedidoMapper = new HistoricoPedidoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(historicoPedidoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(historicoPedidoMapper.fromId(null)).isNull();
    }
}
