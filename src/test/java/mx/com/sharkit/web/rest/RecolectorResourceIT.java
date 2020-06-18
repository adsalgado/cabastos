package mx.com.sharkit.web.rest;

import mx.com.sharkit.AbastosApp;
import mx.com.sharkit.domain.Recolector;
import mx.com.sharkit.repository.RecolectorRepository;
import mx.com.sharkit.service.RecolectorService;
import mx.com.sharkit.service.dto.RecolectorDTO;
import mx.com.sharkit.service.mapper.RecolectorMapper;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RecolectorResource} REST controller.
 */
@SpringBootTest(classes = AbastosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RecolectorResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_ALTA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_ALTA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_MODIFICACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_MODIFICACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private RecolectorRepository recolectorRepository;

    @Autowired
    private RecolectorMapper recolectorMapper;

    @Autowired
    private RecolectorService recolectorService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRecolectorMockMvc;

    private Recolector recolector;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recolector createEntity(EntityManager em) {
        Recolector recolector = new Recolector()
            .nombre(DEFAULT_NOMBRE)
            .fechaAlta(DEFAULT_FECHA_ALTA)
            .fechaModificacion(DEFAULT_FECHA_MODIFICACION);
        return recolector;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recolector createUpdatedEntity(EntityManager em) {
        Recolector recolector = new Recolector()
            .nombre(UPDATED_NOMBRE)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .fechaModificacion(UPDATED_FECHA_MODIFICACION);
        return recolector;
    }

    @BeforeEach
    public void initTest() {
        recolector = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecolector() throws Exception {
        int databaseSizeBeforeCreate = recolectorRepository.findAll().size();
        // Create the Recolector
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(recolector);
        restRecolectorMockMvc.perform(post("/api/recolectors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isCreated());

        // Validate the Recolector in the database
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeCreate + 1);
        Recolector testRecolector = recolectorList.get(recolectorList.size() - 1);
        assertThat(testRecolector.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testRecolector.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testRecolector.getFechaModificacion()).isEqualTo(DEFAULT_FECHA_MODIFICACION);
    }

    @Test
    @Transactional
    public void createRecolectorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recolectorRepository.findAll().size();

        // Create the Recolector with an existing ID
        recolector.setId(1L);
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(recolector);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecolectorMockMvc.perform(post("/api/recolectors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Recolector in the database
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = recolectorRepository.findAll().size();
        // set the field null
        recolector.setNombre(null);

        // Create the Recolector, which fails.
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(recolector);


        restRecolectorMockMvc.perform(post("/api/recolectors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isBadRequest());

        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecolectors() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);

        // Get all the recolectorList
        restRecolectorMockMvc.perform(get("/api/recolectors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recolector.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())))
            .andExpect(jsonPath("$.[*].fechaModificacion").value(hasItem(DEFAULT_FECHA_MODIFICACION.toString())));
    }
    
    @Test
    @Transactional
    public void getRecolector() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);

        // Get the recolector
        restRecolectorMockMvc.perform(get("/api/recolectors/{id}", recolector.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(recolector.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.fechaAlta").value(DEFAULT_FECHA_ALTA.toString()))
            .andExpect(jsonPath("$.fechaModificacion").value(DEFAULT_FECHA_MODIFICACION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRecolector() throws Exception {
        // Get the recolector
        restRecolectorMockMvc.perform(get("/api/recolectors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecolector() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);

        int databaseSizeBeforeUpdate = recolectorRepository.findAll().size();

        // Update the recolector
        Recolector updatedRecolector = recolectorRepository.findById(recolector.getId()).get();
        // Disconnect from session so that the updates on updatedRecolector are not directly saved in db
        em.detach(updatedRecolector);
        updatedRecolector
            .nombre(UPDATED_NOMBRE)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .fechaModificacion(UPDATED_FECHA_MODIFICACION);
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(updatedRecolector);

        restRecolectorMockMvc.perform(put("/api/recolectors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isOk());

        // Validate the Recolector in the database
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeUpdate);
        Recolector testRecolector = recolectorList.get(recolectorList.size() - 1);
        assertThat(testRecolector.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRecolector.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testRecolector.getFechaModificacion()).isEqualTo(UPDATED_FECHA_MODIFICACION);
    }

    @Test
    @Transactional
    public void updateNonExistingRecolector() throws Exception {
        int databaseSizeBeforeUpdate = recolectorRepository.findAll().size();

        // Create the Recolector
        RecolectorDTO recolectorDTO = recolectorMapper.toDto(recolector);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecolectorMockMvc.perform(put("/api/recolectors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recolectorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Recolector in the database
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRecolector() throws Exception {
        // Initialize the database
        recolectorRepository.saveAndFlush(recolector);

        int databaseSizeBeforeDelete = recolectorRepository.findAll().size();

        // Delete the recolector
        restRecolectorMockMvc.perform(delete("/api/recolectors/{id}", recolector.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Recolector> recolectorList = recolectorRepository.findAll();
        assertThat(recolectorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
