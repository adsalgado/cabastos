package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PedidoDetalleMapperTest {

    private PedidoDetalleMapper pedidoDetalleMapper;

    @BeforeEach
    public void setUp() {
        pedidoDetalleMapper = new PedidoDetalleMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(pedidoDetalleMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(pedidoDetalleMapper.fromId(null)).isNull();
    }
}
