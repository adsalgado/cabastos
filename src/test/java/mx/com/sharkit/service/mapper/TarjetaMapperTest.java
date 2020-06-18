package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class TarjetaMapperTest {

    private TarjetaMapper tarjetaMapper;

    @BeforeEach
    public void setUp() {
        tarjetaMapper = new TarjetaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(tarjetaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(tarjetaMapper.fromId(null)).isNull();
    }
}
