package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class TarjetaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TarjetaDTO.class);
        TarjetaDTO tarjetaDTO1 = new TarjetaDTO();
        tarjetaDTO1.setId(1L);
        TarjetaDTO tarjetaDTO2 = new TarjetaDTO();
        assertThat(tarjetaDTO1).isNotEqualTo(tarjetaDTO2);
        tarjetaDTO2.setId(tarjetaDTO1.getId());
        assertThat(tarjetaDTO1).isEqualTo(tarjetaDTO2);
        tarjetaDTO2.setId(2L);
        assertThat(tarjetaDTO1).isNotEqualTo(tarjetaDTO2);
        tarjetaDTO1.setId(null);
        assertThat(tarjetaDTO1).isNotEqualTo(tarjetaDTO2);
    }
}
