package mx.com.sharkit.web.rest;

import mx.com.sharkit.AbastosApp;
import mx.com.sharkit.domain.TipoArticulo;
import mx.com.sharkit.repository.TipoArticuloRepository;
import mx.com.sharkit.service.TipoArticuloService;
import mx.com.sharkit.service.dto.TipoArticuloDTO;
import mx.com.sharkit.service.mapper.TipoArticuloMapper;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipoArticuloResource} REST controller.
 */
@SpringBootTest(classes = AbastosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoArticuloResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private TipoArticuloRepository tipoArticuloRepository;

    @Autowired
    private TipoArticuloMapper tipoArticuloMapper;

    @Autowired
    private TipoArticuloService tipoArticuloService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoArticuloMockMvc;

    private TipoArticulo tipoArticulo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoArticulo createEntity(EntityManager em) {
        TipoArticulo tipoArticulo = new TipoArticulo()
            .nombre(DEFAULT_NOMBRE);
        return tipoArticulo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoArticulo createUpdatedEntity(EntityManager em) {
        TipoArticulo tipoArticulo = new TipoArticulo()
            .nombre(UPDATED_NOMBRE);
        return tipoArticulo;
    }

    @BeforeEach
    public void initTest() {
        tipoArticulo = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoArticulo() throws Exception {
        int databaseSizeBeforeCreate = tipoArticuloRepository.findAll().size();
        // Create the TipoArticulo
        TipoArticuloDTO tipoArticuloDTO = tipoArticuloMapper.toDto(tipoArticulo);
        restTipoArticuloMockMvc.perform(post("/api/tipo-articulos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArticuloDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoArticulo in the database
        List<TipoArticulo> tipoArticuloList = tipoArticuloRepository.findAll();
        assertThat(tipoArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        TipoArticulo testTipoArticulo = tipoArticuloList.get(tipoArticuloList.size() - 1);
        assertThat(testTipoArticulo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createTipoArticuloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoArticuloRepository.findAll().size();

        // Create the TipoArticulo with an existing ID
        tipoArticulo.setId(1L);
        TipoArticuloDTO tipoArticuloDTO = tipoArticuloMapper.toDto(tipoArticulo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoArticuloMockMvc.perform(post("/api/tipo-articulos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArticuloDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoArticulo in the database
        List<TipoArticulo> tipoArticuloList = tipoArticuloRepository.findAll();
        assertThat(tipoArticuloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoArticuloRepository.findAll().size();
        // set the field null
        tipoArticulo.setNombre(null);

        // Create the TipoArticulo, which fails.
        TipoArticuloDTO tipoArticuloDTO = tipoArticuloMapper.toDto(tipoArticulo);


        restTipoArticuloMockMvc.perform(post("/api/tipo-articulos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArticuloDTO)))
            .andExpect(status().isBadRequest());

        List<TipoArticulo> tipoArticuloList = tipoArticuloRepository.findAll();
        assertThat(tipoArticuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoArticulos() throws Exception {
        // Initialize the database
        tipoArticuloRepository.saveAndFlush(tipoArticulo);

        // Get all the tipoArticuloList
        restTipoArticuloMockMvc.perform(get("/api/tipo-articulos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getTipoArticulo() throws Exception {
        // Initialize the database
        tipoArticuloRepository.saveAndFlush(tipoArticulo);

        // Get the tipoArticulo
        restTipoArticuloMockMvc.perform(get("/api/tipo-articulos/{id}", tipoArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoArticulo.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }
    @Test
    @Transactional
    public void getNonExistingTipoArticulo() throws Exception {
        // Get the tipoArticulo
        restTipoArticuloMockMvc.perform(get("/api/tipo-articulos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoArticulo() throws Exception {
        // Initialize the database
        tipoArticuloRepository.saveAndFlush(tipoArticulo);

        int databaseSizeBeforeUpdate = tipoArticuloRepository.findAll().size();

        // Update the tipoArticulo
        TipoArticulo updatedTipoArticulo = tipoArticuloRepository.findById(tipoArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedTipoArticulo are not directly saved in db
        em.detach(updatedTipoArticulo);
        updatedTipoArticulo
            .nombre(UPDATED_NOMBRE);
        TipoArticuloDTO tipoArticuloDTO = tipoArticuloMapper.toDto(updatedTipoArticulo);

        restTipoArticuloMockMvc.perform(put("/api/tipo-articulos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArticuloDTO)))
            .andExpect(status().isOk());

        // Validate the TipoArticulo in the database
        List<TipoArticulo> tipoArticuloList = tipoArticuloRepository.findAll();
        assertThat(tipoArticuloList).hasSize(databaseSizeBeforeUpdate);
        TipoArticulo testTipoArticulo = tipoArticuloList.get(tipoArticuloList.size() - 1);
        assertThat(testTipoArticulo.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = tipoArticuloRepository.findAll().size();

        // Create the TipoArticulo
        TipoArticuloDTO tipoArticuloDTO = tipoArticuloMapper.toDto(tipoArticulo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoArticuloMockMvc.perform(put("/api/tipo-articulos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArticuloDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoArticulo in the database
        List<TipoArticulo> tipoArticuloList = tipoArticuloRepository.findAll();
        assertThat(tipoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoArticulo() throws Exception {
        // Initialize the database
        tipoArticuloRepository.saveAndFlush(tipoArticulo);

        int databaseSizeBeforeDelete = tipoArticuloRepository.findAll().size();

        // Delete the tipoArticulo
        restTipoArticuloMockMvc.perform(delete("/api/tipo-articulos/{id}", tipoArticulo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoArticulo> tipoArticuloList = tipoArticuloRepository.findAll();
        assertThat(tipoArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
