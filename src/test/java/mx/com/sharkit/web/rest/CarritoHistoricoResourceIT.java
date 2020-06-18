package mx.com.sharkit.web.rest;

import mx.com.sharkit.AbastosApp;
import mx.com.sharkit.domain.CarritoHistorico;
import mx.com.sharkit.repository.CarritoHistoricoRepository;
import mx.com.sharkit.service.CarritoHistoricoService;
import mx.com.sharkit.service.dto.CarritoHistoricoDTO;
import mx.com.sharkit.service.mapper.CarritoHistoricoMapper;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CarritoHistoricoResource} REST controller.
 */
@SpringBootTest(classes = AbastosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CarritoHistoricoResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ALTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ALTA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CarritoHistoricoRepository carritoHistoricoRepository;

    @Autowired
    private CarritoHistoricoMapper carritoHistoricoMapper;

    @Autowired
    private CarritoHistoricoService carritoHistoricoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCarritoHistoricoMockMvc;

    private CarritoHistorico carritoHistorico;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarritoHistorico createEntity(EntityManager em) {
        CarritoHistorico carritoHistorico = new CarritoHistorico()
            .nombre(DEFAULT_NOMBRE)
            .fechaAlta(DEFAULT_FECHA_ALTA);
        return carritoHistorico;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarritoHistorico createUpdatedEntity(EntityManager em) {
        CarritoHistorico carritoHistorico = new CarritoHistorico()
            .nombre(UPDATED_NOMBRE)
            .fechaAlta(UPDATED_FECHA_ALTA);
        return carritoHistorico;
    }

    @BeforeEach
    public void initTest() {
        carritoHistorico = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarritoHistorico() throws Exception {
        int databaseSizeBeforeCreate = carritoHistoricoRepository.findAll().size();
        // Create the CarritoHistorico
        CarritoHistoricoDTO carritoHistoricoDTO = carritoHistoricoMapper.toDto(carritoHistorico);
        restCarritoHistoricoMockMvc.perform(post("/api/carrito-historicos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoHistoricoDTO)))
            .andExpect(status().isCreated());

        // Validate the CarritoHistorico in the database
        List<CarritoHistorico> carritoHistoricoList = carritoHistoricoRepository.findAll();
        assertThat(carritoHistoricoList).hasSize(databaseSizeBeforeCreate + 1);
        CarritoHistorico testCarritoHistorico = carritoHistoricoList.get(carritoHistoricoList.size() - 1);
        assertThat(testCarritoHistorico.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCarritoHistorico.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
    }

    @Test
    @Transactional
    public void createCarritoHistoricoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carritoHistoricoRepository.findAll().size();

        // Create the CarritoHistorico with an existing ID
        carritoHistorico.setId(1L);
        CarritoHistoricoDTO carritoHistoricoDTO = carritoHistoricoMapper.toDto(carritoHistorico);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarritoHistoricoMockMvc.perform(post("/api/carrito-historicos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoHistoricoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CarritoHistorico in the database
        List<CarritoHistorico> carritoHistoricoList = carritoHistoricoRepository.findAll();
        assertThat(carritoHistoricoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = carritoHistoricoRepository.findAll().size();
        // set the field null
        carritoHistorico.setNombre(null);

        // Create the CarritoHistorico, which fails.
        CarritoHistoricoDTO carritoHistoricoDTO = carritoHistoricoMapper.toDto(carritoHistorico);


        restCarritoHistoricoMockMvc.perform(post("/api/carrito-historicos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoHistoricoDTO)))
            .andExpect(status().isBadRequest());

        List<CarritoHistorico> carritoHistoricoList = carritoHistoricoRepository.findAll();
        assertThat(carritoHistoricoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaAltaIsRequired() throws Exception {
        int databaseSizeBeforeTest = carritoHistoricoRepository.findAll().size();
        // set the field null
        carritoHistorico.setFechaAlta(null);

        // Create the CarritoHistorico, which fails.
        CarritoHistoricoDTO carritoHistoricoDTO = carritoHistoricoMapper.toDto(carritoHistorico);


        restCarritoHistoricoMockMvc.perform(post("/api/carrito-historicos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoHistoricoDTO)))
            .andExpect(status().isBadRequest());

        List<CarritoHistorico> carritoHistoricoList = carritoHistoricoRepository.findAll();
        assertThat(carritoHistoricoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCarritoHistoricos() throws Exception {
        // Initialize the database
        carritoHistoricoRepository.saveAndFlush(carritoHistorico);

        // Get all the carritoHistoricoList
        restCarritoHistoricoMockMvc.perform(get("/api/carrito-historicos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carritoHistorico.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())));
    }
    
    @Test
    @Transactional
    public void getCarritoHistorico() throws Exception {
        // Initialize the database
        carritoHistoricoRepository.saveAndFlush(carritoHistorico);

        // Get the carritoHistorico
        restCarritoHistoricoMockMvc.perform(get("/api/carrito-historicos/{id}", carritoHistorico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(carritoHistorico.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.fechaAlta").value(DEFAULT_FECHA_ALTA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCarritoHistorico() throws Exception {
        // Get the carritoHistorico
        restCarritoHistoricoMockMvc.perform(get("/api/carrito-historicos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarritoHistorico() throws Exception {
        // Initialize the database
        carritoHistoricoRepository.saveAndFlush(carritoHistorico);

        int databaseSizeBeforeUpdate = carritoHistoricoRepository.findAll().size();

        // Update the carritoHistorico
        CarritoHistorico updatedCarritoHistorico = carritoHistoricoRepository.findById(carritoHistorico.getId()).get();
        // Disconnect from session so that the updates on updatedCarritoHistorico are not directly saved in db
        em.detach(updatedCarritoHistorico);
        updatedCarritoHistorico
            .nombre(UPDATED_NOMBRE)
            .fechaAlta(UPDATED_FECHA_ALTA);
        CarritoHistoricoDTO carritoHistoricoDTO = carritoHistoricoMapper.toDto(updatedCarritoHistorico);

        restCarritoHistoricoMockMvc.perform(put("/api/carrito-historicos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoHistoricoDTO)))
            .andExpect(status().isOk());

        // Validate the CarritoHistorico in the database
        List<CarritoHistorico> carritoHistoricoList = carritoHistoricoRepository.findAll();
        assertThat(carritoHistoricoList).hasSize(databaseSizeBeforeUpdate);
        CarritoHistorico testCarritoHistorico = carritoHistoricoList.get(carritoHistoricoList.size() - 1);
        assertThat(testCarritoHistorico.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCarritoHistorico.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
    }

    @Test
    @Transactional
    public void updateNonExistingCarritoHistorico() throws Exception {
        int databaseSizeBeforeUpdate = carritoHistoricoRepository.findAll().size();

        // Create the CarritoHistorico
        CarritoHistoricoDTO carritoHistoricoDTO = carritoHistoricoMapper.toDto(carritoHistorico);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarritoHistoricoMockMvc.perform(put("/api/carrito-historicos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoHistoricoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CarritoHistorico in the database
        List<CarritoHistorico> carritoHistoricoList = carritoHistoricoRepository.findAll();
        assertThat(carritoHistoricoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarritoHistorico() throws Exception {
        // Initialize the database
        carritoHistoricoRepository.saveAndFlush(carritoHistorico);

        int databaseSizeBeforeDelete = carritoHistoricoRepository.findAll().size();

        // Delete the carritoHistorico
        restCarritoHistoricoMockMvc.perform(delete("/api/carrito-historicos/{id}", carritoHistorico.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CarritoHistorico> carritoHistoricoList = carritoHistoricoRepository.findAll();
        assertThat(carritoHistoricoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
