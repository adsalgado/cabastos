package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class AdjuntoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AdjuntoDTO.class);
        AdjuntoDTO adjuntoDTO1 = new AdjuntoDTO();
        adjuntoDTO1.setId(1L);
        AdjuntoDTO adjuntoDTO2 = new AdjuntoDTO();
        assertThat(adjuntoDTO1).isNotEqualTo(adjuntoDTO2);
        adjuntoDTO2.setId(adjuntoDTO1.getId());
        assertThat(adjuntoDTO1).isEqualTo(adjuntoDTO2);
        adjuntoDTO2.setId(2L);
        assertThat(adjuntoDTO1).isNotEqualTo(adjuntoDTO2);
        adjuntoDTO1.setId(null);
        assertThat(adjuntoDTO1).isNotEqualTo(adjuntoDTO2);
    }
}
