package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class PagosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pagos.class);
        Pagos pagos1 = new Pagos();
        pagos1.setId(1L);
        Pagos pagos2 = new Pagos();
        pagos2.setId(pagos1.getId());
        assertThat(pagos1).isEqualTo(pagos2);
        pagos2.setId(2L);
        assertThat(pagos1).isNotEqualTo(pagos2);
        pagos1.setId(null);
        assertThat(pagos1).isNotEqualTo(pagos2);
    }
}
