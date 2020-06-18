package mx.com.sharkit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import mx.com.sharkit.web.rest.TestUtil;

public class AdjuntoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Adjunto.class);
        Adjunto adjunto1 = new Adjunto();
        adjunto1.setId(1L);
        Adjunto adjunto2 = new Adjunto();
        adjunto2.setId(adjunto1.getId());
        assertThat(adjunto1).isEqualTo(adjunto2);
        adjunto2.setId(2L);
        assertThat(adjunto1).isNotEqualTo(adjunto2);
        adjunto1.setId(null);
        assertThat(adjunto1).isNotEqualTo(adjunto2);
    }
}
