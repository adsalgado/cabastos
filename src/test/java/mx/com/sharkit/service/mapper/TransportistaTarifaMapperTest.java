package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class TransportistaTarifaMapperTest {

    private TransportistaTarifaMapper transportistaTarifaMapper;

    @BeforeEach
    public void setUp() {
        transportistaTarifaMapper = new TransportistaTarifaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(transportistaTarifaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(transportistaTarifaMapper.fromId(null)).isNull();
    }
}
