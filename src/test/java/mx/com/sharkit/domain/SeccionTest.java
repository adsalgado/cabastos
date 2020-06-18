package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class SeccionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seccion.class);
        Seccion seccion1 = new Seccion();
        seccion1.setId(1L);
        Seccion seccion2 = new Seccion();
        seccion2.setId(seccion1.getId());
        assertThat(seccion1).isEqualTo(seccion2);
        seccion2.setId(2L);
        assertThat(seccion1).isNotEqualTo(seccion2);
        seccion1.setId(null);
        assertThat(seccion1).isNotEqualTo(seccion2);
    }
}
