package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TransportistaTarifaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportistaTarifa.class);
        TransportistaTarifa transportistaTarifa1 = new TransportistaTarifa();
        transportistaTarifa1.setId(1L);
        TransportistaTarifa transportistaTarifa2 = new TransportistaTarifa();
        transportistaTarifa2.setId(transportistaTarifa1.getId());
        assertThat(transportistaTarifa1).isEqualTo(transportistaTarifa2);
        transportistaTarifa2.setId(2L);
        assertThat(transportistaTarifa1).isNotEqualTo(transportistaTarifa2);
        transportistaTarifa1.setId(null);
        assertThat(transportistaTarifa1).isNotEqualTo(transportistaTarifa2);
    }
}
