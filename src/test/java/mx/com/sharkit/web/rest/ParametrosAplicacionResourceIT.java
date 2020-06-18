package mx.com.sharkit.web.rest;

import mx.com.sharkit.AbastosApp;
import mx.com.sharkit.domain.ParametrosAplicacion;
import mx.com.sharkit.repository.ParametrosAplicacionRepository;
import mx.com.sharkit.service.ParametrosAplicacionService;
import mx.com.sharkit.service.dto.ParametrosAplicacionDTO;
import mx.com.sharkit.service.mapper.ParametrosAplicacionMapper;

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
 * Integration tests for the {@link ParametrosAplicacionResource} REST controller.
 */
@SpringBootTest(classes = AbastosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ParametrosAplicacionResourceIT {

    private static final String DEFAULT_CLAVE = "AAAAAAAAAA";
    private static final String UPDATED_CLAVE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private ParametrosAplicacionRepository parametrosAplicacionRepository;

    @Autowired
    private ParametrosAplicacionMapper parametrosAplicacionMapper;

    @Autowired
    private ParametrosAplicacionService parametrosAplicacionService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restParametrosAplicacionMockMvc;

    private ParametrosAplicacion parametrosAplicacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParametrosAplicacion createEntity(EntityManager em) {
        ParametrosAplicacion parametrosAplicacion = new ParametrosAplicacion()
            .clave(DEFAULT_CLAVE)
            .descripcion(DEFAULT_DESCRIPCION);
        return parametrosAplicacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParametrosAplicacion createUpdatedEntity(EntityManager em) {
        ParametrosAplicacion parametrosAplicacion = new ParametrosAplicacion()
            .clave(UPDATED_CLAVE)
            .descripcion(UPDATED_DESCRIPCION);
        return parametrosAplicacion;
    }

    @BeforeEach
    public void initTest() {
        parametrosAplicacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createParametrosAplicacion() throws Exception {
        int databaseSizeBeforeCreate = parametrosAplicacionRepository.findAll().size();
        // Create the ParametrosAplicacion
        ParametrosAplicacionDTO parametrosAplicacionDTO = parametrosAplicacionMapper.toDto(parametrosAplicacion);
        restParametrosAplicacionMockMvc.perform(post("/api/parametros-aplicacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(parametrosAplicacionDTO)))
            .andExpect(status().isCreated());

        // Validate the ParametrosAplicacion in the database
        List<ParametrosAplicacion> parametrosAplicacionList = parametrosAplicacionRepository.findAll();
        assertThat(parametrosAplicacionList).hasSize(databaseSizeBeforeCreate + 1);
        ParametrosAplicacion testParametrosAplicacion = parametrosAplicacionList.get(parametrosAplicacionList.size() - 1);
        assertThat(testParametrosAplicacion.getClave()).isEqualTo(DEFAULT_CLAVE);
        assertThat(testParametrosAplicacion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createParametrosAplicacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parametrosAplicacionRepository.findAll().size();

        // Create the ParametrosAplicacion with an existing ID
        parametrosAplicacion.setId(1L);
        ParametrosAplicacionDTO parametrosAplicacionDTO = parametrosAplicacionMapper.toDto(parametrosAplicacion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParametrosAplicacionMockMvc.perform(post("/api/parametros-aplicacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(parametrosAplicacionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParametrosAplicacion in the database
        List<ParametrosAplicacion> parametrosAplicacionList = parametrosAplicacionRepository.findAll();
        assertThat(parametrosAplicacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkClaveIsRequired() throws Exception {
        int databaseSizeBeforeTest = parametrosAplicacionRepository.findAll().size();
        // set the field null
        parametrosAplicacion.setClave(null);

        // Create the ParametrosAplicacion, which fails.
        ParametrosAplicacionDTO parametrosAplicacionDTO = parametrosAplicacionMapper.toDto(parametrosAplicacion);


        restParametrosAplicacionMockMvc.perform(post("/api/parametros-aplicacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(parametrosAplicacionDTO)))
            .andExpect(status().isBadRequest());

        List<ParametrosAplicacion> parametrosAplicacionList = parametrosAplicacionRepository.findAll();
        assertThat(parametrosAplicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllParametrosAplicacions() throws Exception {
        // Initialize the database
        parametrosAplicacionRepository.saveAndFlush(parametrosAplicacion);

        // Get all the parametrosAplicacionList
        restParametrosAplicacionMockMvc.perform(get("/api/parametros-aplicacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parametrosAplicacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].clave").value(hasItem(DEFAULT_CLAVE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getParametrosAplicacion() throws Exception {
        // Initialize the database
        parametrosAplicacionRepository.saveAndFlush(parametrosAplicacion);

        // Get the parametrosAplicacion
        restParametrosAplicacionMockMvc.perform(get("/api/parametros-aplicacions/{id}", parametrosAplicacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(parametrosAplicacion.getId().intValue()))
            .andExpect(jsonPath("$.clave").value(DEFAULT_CLAVE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }
    @Test
    @Transactional
    public void getNonExistingParametrosAplicacion() throws Exception {
        // Get the parametrosAplicacion
        restParametrosAplicacionMockMvc.perform(get("/api/parametros-aplicacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParametrosAplicacion() throws Exception {
        // Initialize the database
        parametrosAplicacionRepository.saveAndFlush(parametrosAplicacion);

        int databaseSizeBeforeUpdate = parametrosAplicacionRepository.findAll().size();

        // Update the parametrosAplicacion
        ParametrosAplicacion updatedParametrosAplicacion = parametrosAplicacionRepository.findById(parametrosAplicacion.getId()).get();
        // Disconnect from session so that the updates on updatedParametrosAplicacion are not directly saved in db
        em.detach(updatedParametrosAplicacion);
        updatedParametrosAplicacion
            .clave(UPDATED_CLAVE)
            .descripcion(UPDATED_DESCRIPCION);
        ParametrosAplicacionDTO parametrosAplicacionDTO = parametrosAplicacionMapper.toDto(updatedParametrosAplicacion);

        restParametrosAplicacionMockMvc.perform(put("/api/parametros-aplicacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(parametrosAplicacionDTO)))
            .andExpect(status().isOk());

        // Validate the ParametrosAplicacion in the database
        List<ParametrosAplicacion> parametrosAplicacionList = parametrosAplicacionRepository.findAll();
        assertThat(parametrosAplicacionList).hasSize(databaseSizeBeforeUpdate);
        ParametrosAplicacion testParametrosAplicacion = parametrosAplicacionList.get(parametrosAplicacionList.size() - 1);
        assertThat(testParametrosAplicacion.getClave()).isEqualTo(UPDATED_CLAVE);
        assertThat(testParametrosAplicacion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingParametrosAplicacion() throws Exception {
        int databaseSizeBeforeUpdate = parametrosAplicacionRepository.findAll().size();

        // Create the ParametrosAplicacion
        ParametrosAplicacionDTO parametrosAplicacionDTO = parametrosAplicacionMapper.toDto(parametrosAplicacion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParametrosAplicacionMockMvc.perform(put("/api/parametros-aplicacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(parametrosAplicacionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ParametrosAplicacion in the database
        List<ParametrosAplicacion> parametrosAplicacionList = parametrosAplicacionRepository.findAll();
        assertThat(parametrosAplicacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParametrosAplicacion() throws Exception {
        // Initialize the database
        parametrosAplicacionRepository.saveAndFlush(parametrosAplicacion);

        int databaseSizeBeforeDelete = parametrosAplicacionRepository.findAll().size();

        // Delete the parametrosAplicacion
        restParametrosAplicacionMockMvc.perform(delete("/api/parametros-aplicacions/{id}", parametrosAplicacion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ParametrosAplicacion> parametrosAplicacionList = parametrosAplicacionRepository.findAll();
        assertThat(parametrosAplicacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
