package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class TransportistaMapperTest {

    private TransportistaMapper transportistaMapper;

    @BeforeEach
    public void setUp() {
        transportistaMapper = new TransportistaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(transportistaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(transportistaMapper.fromId(null)).isNull();
    }
}
