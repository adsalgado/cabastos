package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class ParametrosAplicacionDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParametrosAplicacionDTO.class);
        ParametrosAplicacionDTO parametrosAplicacionDTO1 = new ParametrosAplicacionDTO();
        parametrosAplicacionDTO1.setId(1L);
        ParametrosAplicacionDTO parametrosAplicacionDTO2 = new ParametrosAplicacionDTO();
        assertThat(parametrosAplicacionDTO1).isNotEqualTo(parametrosAplicacionDTO2);
        parametrosAplicacionDTO2.setId(parametrosAplicacionDTO1.getId());
        assertThat(parametrosAplicacionDTO1).isEqualTo(parametrosAplicacionDTO2);
        parametrosAplicacionDTO2.setId(2L);
        assertThat(parametrosAplicacionDTO1).isNotEqualTo(parametrosAplicacionDTO2);
        parametrosAplicacionDTO1.setId(null);
        assertThat(parametrosAplicacionDTO1).isNotEqualTo(parametrosAplicacionDTO2);
    }
}
