package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class OfertaProveedorDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfertaProveedorDTO.class);
        OfertaProveedorDTO ofertaProveedorDTO1 = new OfertaProveedorDTO();
        ofertaProveedorDTO1.setId(1L);
        OfertaProveedorDTO ofertaProveedorDTO2 = new OfertaProveedorDTO();
        assertThat(ofertaProveedorDTO1).isNotEqualTo(ofertaProveedorDTO2);
        ofertaProveedorDTO2.setId(ofertaProveedorDTO1.getId());
        assertThat(ofertaProveedorDTO1).isEqualTo(ofertaProveedorDTO2);
        ofertaProveedorDTO2.setId(2L);
        assertThat(ofertaProveedorDTO1).isNotEqualTo(ofertaProveedorDTO2);
        ofertaProveedorDTO1.setId(null);
        assertThat(ofertaProveedorDTO1).isNotEqualTo(ofertaProveedorDTO2);
    }
}
