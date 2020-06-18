package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class CarritoCompraDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarritoCompraDTO.class);
        CarritoCompraDTO carritoCompraDTO1 = new CarritoCompraDTO();
        carritoCompraDTO1.setId(1L);
        CarritoCompraDTO carritoCompraDTO2 = new CarritoCompraDTO();
        assertThat(carritoCompraDTO1).isNotEqualTo(carritoCompraDTO2);
        carritoCompraDTO2.setId(carritoCompraDTO1.getId());
        assertThat(carritoCompraDTO1).isEqualTo(carritoCompraDTO2);
        carritoCompraDTO2.setId(2L);
        assertThat(carritoCompraDTO1).isNotEqualTo(carritoCompraDTO2);
        carritoCompraDTO1.setId(null);
        assertThat(carritoCompraDTO1).isNotEqualTo(carritoCompraDTO2);
    }
}
