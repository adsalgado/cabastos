package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class UnidadMedidaMapperTest {

    private UnidadMedidaMapper unidadMedidaMapper;

    @BeforeEach
    public void setUp() {
        unidadMedidaMapper = new UnidadMedidaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(unidadMedidaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(unidadMedidaMapper.fromId(null)).isNull();
    }
}
