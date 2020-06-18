package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TransportistaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransportistaDTO.class);
        TransportistaDTO transportistaDTO1 = new TransportistaDTO();
        transportistaDTO1.setId(1L);
        TransportistaDTO transportistaDTO2 = new TransportistaDTO();
        assertThat(transportistaDTO1).isNotEqualTo(transportistaDTO2);
        transportistaDTO2.setId(transportistaDTO1.getId());
        assertThat(transportistaDTO1).isEqualTo(transportistaDTO2);
        transportistaDTO2.setId(2L);
        assertThat(transportistaDTO1).isNotEqualTo(transportistaDTO2);
        transportistaDTO1.setId(null);
        assertThat(transportistaDTO1).isNotEqualTo(transportistaDTO2);
    }
}
