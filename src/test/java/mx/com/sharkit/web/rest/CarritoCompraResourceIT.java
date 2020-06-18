package mx.com.sharkit.web.rest;

import mx.com.sharkit.AbastosApp;
import mx.com.sharkit.domain.CarritoCompra;
import mx.com.sharkit.repository.CarritoCompraRepository;
import mx.com.sharkit.service.CarritoCompraService;
import mx.com.sharkit.service.dto.CarritoCompraDTO;
import mx.com.sharkit.service.mapper.CarritoCompraMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CarritoCompraResource} REST controller.
 */
@SpringBootTest(classes = AbastosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CarritoCompraResourceIT {

    private static final BigDecimal DEFAULT_CANTIDAD = new BigDecimal(1);
    private static final BigDecimal UPDATED_CANTIDAD = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PRECIO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECIO = new BigDecimal(2);

    @Autowired
    private CarritoCompraRepository carritoCompraRepository;

    @Autowired
    private CarritoCompraMapper carritoCompraMapper;

    @Autowired
    private CarritoCompraService carritoCompraService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCarritoCompraMockMvc;

    private CarritoCompra carritoCompra;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarritoCompra createEntity(EntityManager em) {
        CarritoCompra carritoCompra = new CarritoCompra()
            .cantidad(DEFAULT_CANTIDAD)
            .precio(DEFAULT_PRECIO);
        return carritoCompra;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarritoCompra createUpdatedEntity(EntityManager em) {
        CarritoCompra carritoCompra = new CarritoCompra()
            .cantidad(UPDATED_CANTIDAD)
            .precio(UPDATED_PRECIO);
        return carritoCompra;
    }

    @BeforeEach
    public void initTest() {
        carritoCompra = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarritoCompra() throws Exception {
        int databaseSizeBeforeCreate = carritoCompraRepository.findAll().size();
        // Create the CarritoCompra
        CarritoCompraDTO carritoCompraDTO = carritoCompraMapper.toDto(carritoCompra);
        restCarritoCompraMockMvc.perform(post("/api/carrito-compras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoCompraDTO)))
            .andExpect(status().isCreated());

        // Validate the CarritoCompra in the database
        List<CarritoCompra> carritoCompraList = carritoCompraRepository.findAll();
        assertThat(carritoCompraList).hasSize(databaseSizeBeforeCreate + 1);
        CarritoCompra testCarritoCompra = carritoCompraList.get(carritoCompraList.size() - 1);
        assertThat(testCarritoCompra.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testCarritoCompra.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createCarritoCompraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carritoCompraRepository.findAll().size();

        // Create the CarritoCompra with an existing ID
        carritoCompra.setId(1L);
        CarritoCompraDTO carritoCompraDTO = carritoCompraMapper.toDto(carritoCompra);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarritoCompraMockMvc.perform(post("/api/carrito-compras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoCompraDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CarritoCompra in the database
        List<CarritoCompra> carritoCompraList = carritoCompraRepository.findAll();
        assertThat(carritoCompraList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = carritoCompraRepository.findAll().size();
        // set the field null
        carritoCompra.setCantidad(null);

        // Create the CarritoCompra, which fails.
        CarritoCompraDTO carritoCompraDTO = carritoCompraMapper.toDto(carritoCompra);


        restCarritoCompraMockMvc.perform(post("/api/carrito-compras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoCompraDTO)))
            .andExpect(status().isBadRequest());

        List<CarritoCompra> carritoCompraList = carritoCompraRepository.findAll();
        assertThat(carritoCompraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCarritoCompras() throws Exception {
        // Initialize the database
        carritoCompraRepository.saveAndFlush(carritoCompra);

        // Get all the carritoCompraList
        restCarritoCompraMockMvc.perform(get("/api/carrito-compras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carritoCompra.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.intValue())));
    }
    
    @Test
    @Transactional
    public void getCarritoCompra() throws Exception {
        // Initialize the database
        carritoCompraRepository.saveAndFlush(carritoCompra);

        // Get the carritoCompra
        restCarritoCompraMockMvc.perform(get("/api/carrito-compras/{id}", carritoCompra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(carritoCompra.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCarritoCompra() throws Exception {
        // Get the carritoCompra
        restCarritoCompraMockMvc.perform(get("/api/carrito-compras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarritoCompra() throws Exception {
        // Initialize the database
        carritoCompraRepository.saveAndFlush(carritoCompra);

        int databaseSizeBeforeUpdate = carritoCompraRepository.findAll().size();

        // Update the carritoCompra
        CarritoCompra updatedCarritoCompra = carritoCompraRepository.findById(carritoCompra.getId()).get();
        // Disconnect from session so that the updates on updatedCarritoCompra are not directly saved in db
        em.detach(updatedCarritoCompra);
        updatedCarritoCompra
            .cantidad(UPDATED_CANTIDAD)
            .precio(UPDATED_PRECIO);
        CarritoCompraDTO carritoCompraDTO = carritoCompraMapper.toDto(updatedCarritoCompra);

        restCarritoCompraMockMvc.perform(put("/api/carrito-compras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoCompraDTO)))
            .andExpect(status().isOk());

        // Validate the CarritoCompra in the database
        List<CarritoCompra> carritoCompraList = carritoCompraRepository.findAll();
        assertThat(carritoCompraList).hasSize(databaseSizeBeforeUpdate);
        CarritoCompra testCarritoCompra = carritoCompraList.get(carritoCompraList.size() - 1);
        assertThat(testCarritoCompra.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testCarritoCompra.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingCarritoCompra() throws Exception {
        int databaseSizeBeforeUpdate = carritoCompraRepository.findAll().size();

        // Create the CarritoCompra
        CarritoCompraDTO carritoCompraDTO = carritoCompraMapper.toDto(carritoCompra);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarritoCompraMockMvc.perform(put("/api/carrito-compras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoCompraDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CarritoCompra in the database
        List<CarritoCompra> carritoCompraList = carritoCompraRepository.findAll();
        assertThat(carritoCompraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarritoCompra() throws Exception {
        // Initialize the database
        carritoCompraRepository.saveAndFlush(carritoCompra);

        int databaseSizeBeforeDelete = carritoCompraRepository.findAll().size();

        // Delete the carritoCompra
        restCarritoCompraMockMvc.perform(delete("/api/carrito-compras/{id}", carritoCompra.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CarritoCompra> carritoCompraList = carritoCompraRepository.findAll();
        assertThat(carritoCompraList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
