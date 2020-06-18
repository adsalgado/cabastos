package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TipoArticuloDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoArticuloDTO.class);
        TipoArticuloDTO tipoArticuloDTO1 = new TipoArticuloDTO();
        tipoArticuloDTO1.setId(1L);
        TipoArticuloDTO tipoArticuloDTO2 = new TipoArticuloDTO();
        assertThat(tipoArticuloDTO1).isNotEqualTo(tipoArticuloDTO2);
        tipoArticuloDTO2.setId(tipoArticuloDTO1.getId());
        assertThat(tipoArticuloDTO1).isEqualTo(tipoArticuloDTO2);
        tipoArticuloDTO2.setId(2L);
        assertThat(tipoArticuloDTO1).isNotEqualTo(tipoArticuloDTO2);
        tipoArticuloDTO1.setId(null);
        assertThat(tipoArticuloDTO1).isNotEqualTo(tipoArticuloDTO2);
    }
}
