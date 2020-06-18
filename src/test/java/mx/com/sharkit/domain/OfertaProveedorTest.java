package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class OfertaProveedorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfertaProveedor.class);
        OfertaProveedor ofertaProveedor1 = new OfertaProveedor();
        ofertaProveedor1.setId(1L);
        OfertaProveedor ofertaProveedor2 = new OfertaProveedor();
        ofertaProveedor2.setId(ofertaProveedor1.getId());
        assertThat(ofertaProveedor1).isEqualTo(ofertaProveedor2);
        ofertaProveedor2.setId(2L);
        assertThat(ofertaProveedor1).isNotEqualTo(ofertaProveedor2);
        ofertaProveedor1.setId(null);
        assertThat(ofertaProveedor1).isNotEqualTo(ofertaProveedor2);
    }
}
