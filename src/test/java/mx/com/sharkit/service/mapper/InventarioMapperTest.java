package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class InventarioMapperTest {

    private InventarioMapper inventarioMapper;

    @BeforeEach
    public void setUp() {
        inventarioMapper = new InventarioMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(inventarioMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(inventarioMapper.fromId(null)).isNull();
    }
}
