package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TipoOfertaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoOferta.class);
        TipoOferta tipoOferta1 = new TipoOferta();
        tipoOferta1.setId(1L);
        TipoOferta tipoOferta2 = new TipoOferta();
        tipoOferta2.setId(tipoOferta1.getId());
        assertThat(tipoOferta1).isEqualTo(tipoOferta2);
        tipoOferta2.setId(2L);
        assertThat(tipoOferta1).isNotEqualTo(tipoOferta2);
        tipoOferta1.setId(null);
        assertThat(tipoOferta1).isNotEqualTo(tipoOferta2);
    }
}
