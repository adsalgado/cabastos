package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class OfertaProveedorMapperTest {

    private OfertaProveedorMapper ofertaProveedorMapper;

    @BeforeEach
    public void setUp() {
        ofertaProveedorMapper = new OfertaProveedorMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(ofertaProveedorMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(ofertaProveedorMapper.fromId(null)).isNull();
    }
}
