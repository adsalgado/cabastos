package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RecolectorMapperTest {

    private RecolectorMapper recolectorMapper;

    @BeforeEach
    public void setUp() {
        recolectorMapper = new RecolectorMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(recolectorMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(recolectorMapper.fromId(null)).isNull();
    }
}
