package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class TipoOfertaMapperTest {

    private TipoOfertaMapper tipoOfertaMapper;

    @BeforeEach
    public void setUp() {
        tipoOfertaMapper = new TipoOfertaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(tipoOfertaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(tipoOfertaMapper.fromId(null)).isNull();
    }
}
