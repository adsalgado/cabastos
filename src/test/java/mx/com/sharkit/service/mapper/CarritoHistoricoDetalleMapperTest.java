package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CarritoHistoricoDetalleMapperTest {

    private CarritoHistoricoDetalleMapper carritoHistoricoDetalleMapper;

    @BeforeEach
    public void setUp() {
        carritoHistoricoDetalleMapper = new CarritoHistoricoDetalleMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(carritoHistoricoDetalleMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(carritoHistoricoDetalleMapper.fromId(null)).isNull();
    }
}
