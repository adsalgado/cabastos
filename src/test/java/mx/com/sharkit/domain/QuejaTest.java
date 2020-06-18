package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class QuejaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Queja.class);
        Queja queja1 = new Queja();
        queja1.setId(1L);
        Queja queja2 = new Queja();
        queja2.setId(queja1.getId());
        assertThat(queja1).isEqualTo(queja2);
        queja2.setId(2L);
        assertThat(queja1).isNotEqualTo(queja2);
        queja1.setId(null);
        assertThat(queja1).isNotEqualTo(queja2);
    }
}
