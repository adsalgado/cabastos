package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class PagosDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagosDTO.class);
        PagosDTO pagosDTO1 = new PagosDTO();
        pagosDTO1.setId(1L);
        PagosDTO pagosDTO2 = new PagosDTO();
        assertThat(pagosDTO1).isNotEqualTo(pagosDTO2);
        pagosDTO2.setId(pagosDTO1.getId());
        assertThat(pagosDTO1).isEqualTo(pagosDTO2);
        pagosDTO2.setId(2L);
        assertThat(pagosDTO1).isNotEqualTo(pagosDTO2);
        pagosDTO1.setId(null);
        assertThat(pagosDTO1).isNotEqualTo(pagosDTO2);
    }
}
