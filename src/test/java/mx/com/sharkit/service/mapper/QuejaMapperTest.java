package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class QuejaMapperTest {

    private QuejaMapper quejaMapper;

    @BeforeEach
    public void setUp() {
        quejaMapper = new QuejaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(quejaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(quejaMapper.fromId(null)).isNull();
    }
}
