package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class EstatusMapperTest {

    private EstatusMapper estatusMapper;

    @BeforeEach
    public void setUp() {
        estatusMapper = new EstatusMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(estatusMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(estatusMapper.fromId(null)).isNull();
    }
}
