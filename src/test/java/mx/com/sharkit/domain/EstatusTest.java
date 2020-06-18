package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class EstatusTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estatus.class);
        Estatus estatus1 = new Estatus();
        estatus1.setId(1L);
        Estatus estatus2 = new Estatus();
        estatus2.setId(estatus1.getId());
        assertThat(estatus1).isEqualTo(estatus2);
        estatus2.setId(2L);
        assertThat(estatus1).isNotEqualTo(estatus2);
        estatus1.setId(null);
        assertThat(estatus1).isNotEqualTo(estatus2);
    }
}
