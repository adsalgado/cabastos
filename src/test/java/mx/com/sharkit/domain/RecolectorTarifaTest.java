package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class RecolectorTarifaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecolectorTarifa.class);
        RecolectorTarifa recolectorTarifa1 = new RecolectorTarifa();
        recolectorTarifa1.setId(1L);
        RecolectorTarifa recolectorTarifa2 = new RecolectorTarifa();
        recolectorTarifa2.setId(recolectorTarifa1.getId());
        assertThat(recolectorTarifa1).isEqualTo(recolectorTarifa2);
        recolectorTarifa2.setId(2L);
        assertThat(recolectorTarifa1).isNotEqualTo(recolectorTarifa2);
        recolectorTarifa1.setId(null);
        assertThat(recolectorTarifa1).isNotEqualTo(recolectorTarifa2);
    }
}
