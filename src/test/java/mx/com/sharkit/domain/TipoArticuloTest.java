package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TipoArticuloTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoArticulo.class);
        TipoArticulo tipoArticulo1 = new TipoArticulo();
        tipoArticulo1.setId(1L);
        TipoArticulo tipoArticulo2 = new TipoArticulo();
        tipoArticulo2.setId(tipoArticulo1.getId());
        assertThat(tipoArticulo1).isEqualTo(tipoArticulo2);
        tipoArticulo2.setId(2L);
        assertThat(tipoArticulo1).isNotEqualTo(tipoArticulo2);
        tipoArticulo1.setId(null);
        assertThat(tipoArticulo1).isNotEqualTo(tipoArticulo2);
    }
}
