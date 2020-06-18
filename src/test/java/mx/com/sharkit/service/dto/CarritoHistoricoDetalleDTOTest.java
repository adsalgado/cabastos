package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class CarritoHistoricoDetalleDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarritoHistoricoDetalleDTO.class);
        CarritoHistoricoDetalleDTO carritoHistoricoDetalleDTO1 = new CarritoHistoricoDetalleDTO();
        carritoHistoricoDetalleDTO1.setId(1L);
        CarritoHistoricoDetalleDTO carritoHistoricoDetalleDTO2 = new CarritoHistoricoDetalleDTO();
        assertThat(carritoHistoricoDetalleDTO1).isNotEqualTo(carritoHistoricoDetalleDTO2);
        carritoHistoricoDetalleDTO2.setId(carritoHistoricoDetalleDTO1.getId());
        assertThat(carritoHistoricoDetalleDTO1).isEqualTo(carritoHistoricoDetalleDTO2);
        carritoHistoricoDetalleDTO2.setId(2L);
        assertThat(carritoHistoricoDetalleDTO1).isNotEqualTo(carritoHistoricoDetalleDTO2);
        carritoHistoricoDetalleDTO1.setId(null);
        assertThat(carritoHistoricoDetalleDTO1).isNotEqualTo(carritoHistoricoDetalleDTO2);
    }
}
