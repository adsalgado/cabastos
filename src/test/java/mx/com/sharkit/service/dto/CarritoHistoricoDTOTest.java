package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class CarritoHistoricoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarritoHistoricoDTO.class);
        CarritoHistoricoDTO carritoHistoricoDTO1 = new CarritoHistoricoDTO();
        carritoHistoricoDTO1.setId(1L);
        CarritoHistoricoDTO carritoHistoricoDTO2 = new CarritoHistoricoDTO();
        assertThat(carritoHistoricoDTO1).isNotEqualTo(carritoHistoricoDTO2);
        carritoHistoricoDTO2.setId(carritoHistoricoDTO1.getId());
        assertThat(carritoHistoricoDTO1).isEqualTo(carritoHistoricoDTO2);
        carritoHistoricoDTO2.setId(2L);
        assertThat(carritoHistoricoDTO1).isNotEqualTo(carritoHistoricoDTO2);
        carritoHistoricoDTO1.setId(null);
        assertThat(carritoHistoricoDTO1).isNotEqualTo(carritoHistoricoDTO2);
    }
}
