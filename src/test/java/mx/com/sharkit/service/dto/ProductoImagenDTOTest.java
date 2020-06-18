package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class ProductoImagenDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductoImagenDTO.class);
        ProductoImagenDTO productoImagenDTO1 = new ProductoImagenDTO();
        productoImagenDTO1.setId(1L);
        ProductoImagenDTO productoImagenDTO2 = new ProductoImagenDTO();
        assertThat(productoImagenDTO1).isNotEqualTo(productoImagenDTO2);
        productoImagenDTO2.setId(productoImagenDTO1.getId());
        assertThat(productoImagenDTO1).isEqualTo(productoImagenDTO2);
        productoImagenDTO2.setId(2L);
        assertThat(productoImagenDTO1).isNotEqualTo(productoImagenDTO2);
        productoImagenDTO1.setId(null);
        assertThat(productoImagenDTO1).isNotEqualTo(productoImagenDTO2);
    }
}
