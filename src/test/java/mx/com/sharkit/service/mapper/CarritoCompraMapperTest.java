package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CarritoCompraMapperTest {

    private CarritoCompraMapper carritoCompraMapper;

    @BeforeEach
    public void setUp() {
        carritoCompraMapper = new CarritoCompraMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(carritoCompraMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(carritoCompraMapper.fromId(null)).isNull();
    }
}
