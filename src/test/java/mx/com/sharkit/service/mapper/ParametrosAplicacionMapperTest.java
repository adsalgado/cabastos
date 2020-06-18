package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ParametrosAplicacionMapperTest {

    private ParametrosAplicacionMapper parametrosAplicacionMapper;

    @BeforeEach
    public void setUp() {
        parametrosAplicacionMapper = new ParametrosAplicacionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(parametrosAplicacionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(parametrosAplicacionMapper.fromId(null)).isNull();
    }
}
