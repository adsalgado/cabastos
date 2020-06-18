package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class UsuarioImagenMapperTest {

    private UsuarioImagenMapper usuarioImagenMapper;

    @BeforeEach
    public void setUp() {
        usuarioImagenMapper = new UsuarioImagenMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(usuarioImagenMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(usuarioImagenMapper.fromId(null)).isNull();
    }
}
