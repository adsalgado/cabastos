package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class DireccionDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DireccionDTO.class);
        DireccionDTO direccionDTO1 = new DireccionDTO();
        direccionDTO1.setId(1L);
        DireccionDTO direccionDTO2 = new DireccionDTO();
        assertThat(direccionDTO1).isNotEqualTo(direccionDTO2);
        direccionDTO2.setId(direccionDTO1.getId());
        assertThat(direccionDTO1).isEqualTo(direccionDTO2);
        direccionDTO2.setId(2L);
        assertThat(direccionDTO1).isNotEqualTo(direccionDTO2);
        direccionDTO1.setId(null);
        assertThat(direccionDTO1).isNotEqualTo(direccionDTO2);
    }
}
