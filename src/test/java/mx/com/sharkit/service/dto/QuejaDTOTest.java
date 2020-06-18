package mx.com.sharkit.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class QuejaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuejaDTO.class);
        QuejaDTO quejaDTO1 = new QuejaDTO();
        quejaDTO1.setId(1L);
        QuejaDTO quejaDTO2 = new QuejaDTO();
        assertThat(quejaDTO1).isNotEqualTo(quejaDTO2);
        quejaDTO2.setId(quejaDTO1.getId());
        assertThat(quejaDTO1).isEqualTo(quejaDTO2);
        quejaDTO2.setId(2L);
        assertThat(quejaDTO1).isNotEqualTo(quejaDTO2);
        quejaDTO1.setId(null);
        assertThat(quejaDTO1).isNotEqualTo(quejaDTO2);
    }
}
