package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class ParametrosAplicacionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParametrosAplicacion.class);
        ParametrosAplicacion parametrosAplicacion1 = new ParametrosAplicacion();
        parametrosAplicacion1.setId(1L);
        ParametrosAplicacion parametrosAplicacion2 = new ParametrosAplicacion();
        parametrosAplicacion2.setId(parametrosAplicacion1.getId());
        assertThat(parametrosAplicacion1).isEqualTo(parametrosAplicacion2);
        parametrosAplicacion2.setId(2L);
        assertThat(parametrosAplicacion1).isNotEqualTo(parametrosAplicacion2);
        parametrosAplicacion1.setId(null);
        assertThat(parametrosAplicacion1).isNotEqualTo(parametrosAplicacion2);
    }
}
