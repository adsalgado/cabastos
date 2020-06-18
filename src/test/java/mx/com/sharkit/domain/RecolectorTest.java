package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class RecolectorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recolector.class);
        Recolector recolector1 = new Recolector();
        recolector1.setId(1L);
        Recolector recolector2 = new Recolector();
        recolector2.setId(recolector1.getId());
        assertThat(recolector1).isEqualTo(recolector2);
        recolector2.setId(2L);
        assertThat(recolector1).isNotEqualTo(recolector2);
        recolector1.setId(null);
        assertThat(recolector1).isNotEqualTo(recolector2);
    }
}
