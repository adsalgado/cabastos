package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class UnidadMedidaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnidadMedidaDTO.class);
        UnidadMedidaDTO unidadMedidaDTO1 = new UnidadMedidaDTO();
        unidadMedidaDTO1.setId(1L);
        UnidadMedidaDTO unidadMedidaDTO2 = new UnidadMedidaDTO();
        assertThat(unidadMedidaDTO1).isNotEqualTo(unidadMedidaDTO2);
        unidadMedidaDTO2.setId(unidadMedidaDTO1.getId());
        assertThat(unidadMedidaDTO1).isEqualTo(unidadMedidaDTO2);
        unidadMedidaDTO2.setId(2L);
        assertThat(unidadMedidaDTO1).isNotEqualTo(unidadMedidaDTO2);
        unidadMedidaDTO1.setId(null);
        assertThat(unidadMedidaDTO1).isNotEqualTo(unidadMedidaDTO2);
    }
}
