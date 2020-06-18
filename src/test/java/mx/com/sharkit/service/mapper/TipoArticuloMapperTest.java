package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class TipoArticuloMapperTest {

    private TipoArticuloMapper tipoArticuloMapper;

    @BeforeEach
    public void setUp() {
        tipoArticuloMapper = new TipoArticuloMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(tipoArticuloMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(tipoArticuloMapper.fromId(null)).isNull();
    }
}
