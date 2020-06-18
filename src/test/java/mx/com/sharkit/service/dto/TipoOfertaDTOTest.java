package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TipoOfertaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoOfertaDTO.class);
        TipoOfertaDTO tipoOfertaDTO1 = new TipoOfertaDTO();
        tipoOfertaDTO1.setId(1L);
        TipoOfertaDTO tipoOfertaDTO2 = new TipoOfertaDTO();
        assertThat(tipoOfertaDTO1).isNotEqualTo(tipoOfertaDTO2);
        tipoOfertaDTO2.setId(tipoOfertaDTO1.getId());
        assertThat(tipoOfertaDTO1).isEqualTo(tipoOfertaDTO2);
        tipoOfertaDTO2.setId(2L);
        assertThat(tipoOfertaDTO1).isNotEqualTo(tipoOfertaDTO2);
        tipoOfertaDTO1.setId(null);
        assertThat(tipoOfertaDTO1).isNotEqualTo(tipoOfertaDTO2);
    }
}
