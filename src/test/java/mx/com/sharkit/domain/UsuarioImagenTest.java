package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class UsuarioImagenTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuarioImagen.class);
        UsuarioImagen usuarioImagen1 = new UsuarioImagen();
        usuarioImagen1.setId(1L);
        UsuarioImagen usuarioImagen2 = new UsuarioImagen();
        usuarioImagen2.setId(usuarioImagen1.getId());
        assertThat(usuarioImagen1).isEqualTo(usuarioImagen2);
        usuarioImagen2.setId(2L);
        assertThat(usuarioImagen1).isNotEqualTo(usuarioImagen2);
        usuarioImagen1.setId(null);
        assertThat(usuarioImagen1).isNotEqualTo(usuarioImagen2);
    }
}
