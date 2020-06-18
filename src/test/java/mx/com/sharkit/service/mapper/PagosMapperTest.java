package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PagosMapperTest {

    private PagosMapper pagosMapper;

    @BeforeEach
    public void setUp() {
        pagosMapper = new PagosMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(pagosMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(pagosMapper.fromId(null)).isNull();
    }
}
