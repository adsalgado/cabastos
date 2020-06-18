package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TransportistaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transportista.class);
        Transportista transportista1 = new Transportista();
        transportista1.setId(1L);
        Transportista transportista2 = new Transportista();
        transportista2.setId(transportista1.getId());
        assertThat(transportista1).isEqualTo(transportista2);
        transportista2.setId(2L);
        assertThat(transportista1).isNotEqualTo(transportista2);
        transportista1.setId(null);
        assertThat(transportista1).isNotEqualTo(transportista2);
    }
}
