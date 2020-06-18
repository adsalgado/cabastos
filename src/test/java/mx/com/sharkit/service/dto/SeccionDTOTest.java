package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class SeccionDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SeccionDTO.class);
        SeccionDTO seccionDTO1 = new SeccionDTO();
        seccionDTO1.setId(1L);
        SeccionDTO seccionDTO2 = new SeccionDTO();
        assertThat(seccionDTO1).isNotEqualTo(seccionDTO2);
        seccionDTO2.setId(seccionDTO1.getId());
        assertThat(seccionDTO1).isEqualTo(seccionDTO2);
        seccionDTO2.setId(2L);
        assertThat(seccionDTO1).isNotEqualTo(seccionDTO2);
        seccionDTO1.setId(null);
        assertThat(seccionDTO1).isNotEqualTo(seccionDTO2);
    }
}
