package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class RecolectorDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecolectorDTO.class);
        RecolectorDTO recolectorDTO1 = new RecolectorDTO();
        recolectorDTO1.setId(1L);
        RecolectorDTO recolectorDTO2 = new RecolectorDTO();
        assertThat(recolectorDTO1).isNotEqualTo(recolectorDTO2);
        recolectorDTO2.setId(recolectorDTO1.getId());
        assertThat(recolectorDTO1).isEqualTo(recolectorDTO2);
        recolectorDTO2.setId(2L);
        assertThat(recolectorDTO1).isNotEqualTo(recolectorDTO2);
        recolectorDTO1.setId(null);
        assertThat(recolectorDTO1).isNotEqualTo(recolectorDTO2);
    }
}
