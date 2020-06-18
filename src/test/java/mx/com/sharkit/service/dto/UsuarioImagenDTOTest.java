package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class UsuarioImagenDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuarioImagenDTO.class);
        UsuarioImagenDTO usuarioImagenDTO1 = new UsuarioImagenDTO();
        usuarioImagenDTO1.setId(1L);
        UsuarioImagenDTO usuarioImagenDTO2 = new UsuarioImagenDTO();
        assertThat(usuarioImagenDTO1).isNotEqualTo(usuarioImagenDTO2);
        usuarioImagenDTO2.setId(usuarioImagenDTO1.getId());
        assertThat(usuarioImagenDTO1).isEqualTo(usuarioImagenDTO2);
        usuarioImagenDTO2.setId(2L);
        assertThat(usuarioImagenDTO1).isNotEqualTo(usuarioImagenDTO2);
        usuarioImagenDTO1.setId(null);
        assertThat(usuarioImagenDTO1).isNotEqualTo(usuarioImagenDTO2);
    }
}
