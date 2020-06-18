package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TransportistaTarifaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportistaTarifaDTO.class);
        TransportistaTarifaDTO transportistaTarifaDTO1 = new TransportistaTarifaDTO();
        transportistaTarifaDTO1.setId(1L);
        TransportistaTarifaDTO transportistaTarifaDTO2 = new TransportistaTarifaDTO();
        assertThat(transportistaTarifaDTO1).isNotEqualTo(transportistaTarifaDTO2);
        transportistaTarifaDTO2.setId(transportistaTarifaDTO1.getId());
        assertThat(transportistaTarifaDTO1).isEqualTo(transportistaTarifaDTO2);
        transportistaTarifaDTO2.setId(2L);
        assertThat(transportistaTarifaDTO1).isNotEqualTo(transportistaTarifaDTO2);
        transportistaTarifaDTO1.setId(null);
        assertThat(transportistaTarifaDTO1).isNotEqualTo(transportistaTarifaDTO2);
    }
}
