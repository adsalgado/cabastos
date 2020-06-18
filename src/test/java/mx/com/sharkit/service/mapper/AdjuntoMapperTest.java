package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class AdjuntoMapperTest {

    private AdjuntoMapper adjuntoMapper;

    @BeforeEach
    public void setUp() {
        adjuntoMapper = new AdjuntoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(adjuntoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(adjuntoMapper.fromId(null)).isNull();
    }
}
