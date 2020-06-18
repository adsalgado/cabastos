package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CarritoHistoricoMapperTest {

    private CarritoHistoricoMapper carritoHistoricoMapper;

    @BeforeEach
    public void setUp() {
        carritoHistoricoMapper = new CarritoHistoricoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(carritoHistoricoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(carritoHistoricoMapper.fromId(null)).isNull();
    }
}
