package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class RecolectorTarifaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecolectorTarifaDTO.class);
        RecolectorTarifaDTO recolectorTarifaDTO1 = new RecolectorTarifaDTO();
        recolectorTarifaDTO1.setId(1L);
        RecolectorTarifaDTO recolectorTarifaDTO2 = new RecolectorTarifaDTO();
        assertThat(recolectorTarifaDTO1).isNotEqualTo(recolectorTarifaDTO2);
        recolectorTarifaDTO2.setId(recolectorTarifaDTO1.getId());
        assertThat(recolectorTarifaDTO1).isEqualTo(recolectorTarifaDTO2);
        recolectorTarifaDTO2.setId(2L);
        assertThat(recolectorTarifaDTO1).isNotEqualTo(recolectorTarifaDTO2);
        recolectorTarifaDTO1.setId(null);
        assertThat(recolectorTarifaDTO1).isNotEqualTo(recolectorTarifaDTO2);
    }
}
