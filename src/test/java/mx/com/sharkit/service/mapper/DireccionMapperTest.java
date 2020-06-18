package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class DireccionMapperTest {

    private DireccionMapper direccionMapper;

    @BeforeEach
    public void setUp() {
        direccionMapper = new DireccionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(direccionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(direccionMapper.fromId(null)).isNull();
    }
}
