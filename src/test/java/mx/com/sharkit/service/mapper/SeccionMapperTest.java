package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class SeccionMapperTest {

    private SeccionMapper seccionMapper;

    @BeforeEach
    public void setUp() {
        seccionMapper = new SeccionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(seccionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(seccionMapper.fromId(null)).isNull();
    }
}
