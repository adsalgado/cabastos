package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class InventarioHistoricoMapperTest {

    private InventarioHistoricoMapper inventarioHistoricoMapper;

    @BeforeEach
    public void setUp() {
        inventarioHistoricoMapper = new InventarioHistoricoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(inventarioHistoricoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(inventarioHistoricoMapper.fromId(null)).isNull();
    }
}
