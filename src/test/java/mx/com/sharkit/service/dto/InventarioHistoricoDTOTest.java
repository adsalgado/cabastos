package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class InventarioHistoricoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InventarioHistoricoDTO.class);
        InventarioHistoricoDTO inventarioHistoricoDTO1 = new InventarioHistoricoDTO();
        inventarioHistoricoDTO1.setId(1L);
        InventarioHistoricoDTO inventarioHistoricoDTO2 = new InventarioHistoricoDTO();
        assertThat(inventarioHistoricoDTO1).isNotEqualTo(inventarioHistoricoDTO2);
        inventarioHistoricoDTO2.setId(inventarioHistoricoDTO1.getId());
        assertThat(inventarioHistoricoDTO1).isEqualTo(inventarioHistoricoDTO2);
        inventarioHistoricoDTO2.setId(2L);
        assertThat(inventarioHistoricoDTO1).isNotEqualTo(inventarioHistoricoDTO2);
        inventarioHistoricoDTO1.setId(null);
        assertThat(inventarioHistoricoDTO1).isNotEqualTo(inventarioHistoricoDTO2);
    }
}
