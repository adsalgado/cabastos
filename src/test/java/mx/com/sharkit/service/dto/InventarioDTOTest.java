package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class InventarioDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InventarioDTO.class);
        InventarioDTO inventarioDTO1 = new InventarioDTO();
        inventarioDTO1.setId(1L);
        InventarioDTO inventarioDTO2 = new InventarioDTO();
        assertThat(inventarioDTO1).isNotEqualTo(inventarioDTO2);
        inventarioDTO2.setId(inventarioDTO1.getId());
        assertThat(inventarioDTO1).isEqualTo(inventarioDTO2);
        inventarioDTO2.setId(2L);
        assertThat(inventarioDTO1).isNotEqualTo(inventarioDTO2);
        inventarioDTO1.setId(null);
        assertThat(inventarioDTO1).isNotEqualTo(inventarioDTO2);
    }
}
