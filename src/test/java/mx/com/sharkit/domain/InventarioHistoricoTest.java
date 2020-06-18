package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class InventarioHistoricoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InventarioHistorico.class);
        InventarioHistorico inventarioHistorico1 = new InventarioHistorico();
        inventarioHistorico1.setId(1L);
        InventarioHistorico inventarioHistorico2 = new InventarioHistorico();
        inventarioHistorico2.setId(inventarioHistorico1.getId());
        assertThat(inventarioHistorico1).isEqualTo(inventarioHistorico2);
        inventarioHistorico2.setId(2L);
        assertThat(inventarioHistorico1).isNotEqualTo(inventarioHistorico2);
        inventarioHistorico1.setId(null);
        assertThat(inventarioHistorico1).isNotEqualTo(inventarioHistorico2);
    }
}
