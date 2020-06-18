package mx.com.sharkit.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ProductoImagenMapperTest {

    private ProductoImagenMapper productoImagenMapper;

    @BeforeEach
    public void setUp() {
        productoImagenMapper = new ProductoImagenMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(productoImagenMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(productoImagenMapper.fromId(null)).isNull();
    }
}
