package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RecolectorTarifaMapperTest {

    private RecolectorTarifaMapper recolectorTarifaMapper;

    @BeforeEach
    public void setUp() {
        recolectorTarifaMapper = new RecolectorTarifaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(recolectorTarifaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(recolectorTarifaMapper.fromId(null)).isNull();
    }
}
