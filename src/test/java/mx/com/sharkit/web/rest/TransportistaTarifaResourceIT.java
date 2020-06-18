package mx.com.sharkit.web.rest;

import mx.com.sharkit.AbastosApp;
import mx.com.sharkit.domain.TransportistaTarifa;
import mx.com.sharkit.repository.TransportistaTarifaRepository;
import mx.com.sharkit.service.TransportistaTarifaService;
import mx.com.sharkit.service.dto.TransportistaTarifaDTO;
import mx.com.sharkit.service.mapper.TransportistaTarifaMapper;

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
 * Integration tests for the {@link TransportistaTarifaResource} REST controller.
 */
@SpringBootTest(classes = AbastosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TransportistaTarifaResourceIT {

    private static final BigDecimal DEFAULT_RANGO_MINIMO = new BigDecimal(1);
    private static final BigDecimal UPDATED_RANGO_MINIMO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_RANGO_MAXIMO = new BigDecimal(1);
    private static final BigDecimal UPDATED_RANGO_MAXIMO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PRECIO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECIO = new BigDecimal(2);

    @Autowired
    private TransportistaTarifaRepository transportistaTarifaRepository;

    @Autowired
    private TransportistaTarifaMapper transportistaTarifaMapper;

    @Autowired
    private TransportistaTarifaService transportistaTarifaService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTransportistaTarifaMockMvc;

    private TransportistaTarifa transportistaTarifa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransportistaTarifa createEntity(EntityManager em) {
        TransportistaTarifa transportistaTarifa = new TransportistaTarifa()
            .rangoMinimo(DEFAULT_RANGO_MINIMO)
            .rangoMaximo(DEFAULT_RANGO_MAXIMO)
            .precio(DEFAULT_PRECIO);
        return transportistaTarifa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransportistaTarifa createUpdatedEntity(EntityManager em) {
        TransportistaTarifa transportistaTarifa = new TransportistaTarifa()
            .rangoMinimo(UPDATED_RANGO_MINIMO)
            .rangoMaximo(UPDATED_RANGO_MAXIMO)
            .precio(UPDATED_PRECIO);
        return transportistaTarifa;
    }

    @BeforeEach
    public void initTest() {
        transportistaTarifa = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransportistaTarifa() throws Exception {
        int databaseSizeBeforeCreate = transportistaTarifaRepository.findAll().size();
        // Create the TransportistaTarifa
        TransportistaTarifaDTO transportistaTarifaDTO = transportistaTarifaMapper.toDto(transportistaTarifa);
        restTransportistaTarifaMockMvc.perform(post("/api/transportista-tarifas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTarifaDTO)))
            .andExpect(status().isCreated());

        // Validate the TransportistaTarifa in the database
        List<TransportistaTarifa> transportistaTarifaList = transportistaTarifaRepository.findAll();
        assertThat(transportistaTarifaList).hasSize(databaseSizeBeforeCreate + 1);
        TransportistaTarifa testTransportistaTarifa = transportistaTarifaList.get(transportistaTarifaList.size() - 1);
        assertThat(testTransportistaTarifa.getRangoMinimo()).isEqualTo(DEFAULT_RANGO_MINIMO);
        assertThat(testTransportistaTarifa.getRangoMaximo()).isEqualTo(DEFAULT_RANGO_MAXIMO);
        assertThat(testTransportistaTarifa.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createTransportistaTarifaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transportistaTarifaRepository.findAll().size();

        // Create the TransportistaTarifa with an existing ID
        transportistaTarifa.setId(1L);
        TransportistaTarifaDTO transportistaTarifaDTO = transportistaTarifaMapper.toDto(transportistaTarifa);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportistaTarifaMockMvc.perform(post("/api/transportista-tarifas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTarifaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransportistaTarifa in the database
        List<TransportistaTarifa> transportistaTarifaList = transportistaTarifaRepository.findAll();
        assertThat(transportistaTarifaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRangoMinimoIsRequired() throws Exception {
        int databaseSizeBeforeTest = transportistaTarifaRepository.findAll().size();
        // set the field null
        transportistaTarifa.setRangoMinimo(null);

        // Create the TransportistaTarifa, which fails.
        TransportistaTarifaDTO transportistaTarifaDTO = transportistaTarifaMapper.toDto(transportistaTarifa);


        restTransportistaTarifaMockMvc.perform(post("/api/transportista-tarifas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTarifaDTO)))
            .andExpect(status().isBadRequest());

        List<TransportistaTarifa> transportistaTarifaList = transportistaTarifaRepository.findAll();
        assertThat(transportistaTarifaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRangoMaximoIsRequired() throws Exception {
        int databaseSizeBeforeTest = transportistaTarifaRepository.findAll().size();
        // set the field null
        transportistaTarifa.setRangoMaximo(null);

        // Create the TransportistaTarifa, which fails.
        TransportistaTarifaDTO transportistaTarifaDTO = transportistaTarifaMapper.toDto(transportistaTarifa);


        restTransportistaTarifaMockMvc.perform(post("/api/transportista-tarifas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTarifaDTO)))
            .andExpect(status().isBadRequest());

        List<TransportistaTarifa> transportistaTarifaList = transportistaTarifaRepository.findAll();
        assertThat(transportistaTarifaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrecioIsRequired() throws Exception {
        int databaseSizeBeforeTest = transportistaTarifaRepository.findAll().size();
        // set the field null
        transportistaTarifa.setPrecio(null);

        // Create the TransportistaTarifa, which fails.
        TransportistaTarifaDTO transportistaTarifaDTO = transportistaTarifaMapper.toDto(transportistaTarifa);


        restTransportistaTarifaMockMvc.perform(post("/api/transportista-tarifas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTarifaDTO)))
            .andExpect(status().isBadRequest());

        List<TransportistaTarifa> transportistaTarifaList = transportistaTarifaRepository.findAll();
        assertThat(transportistaTarifaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransportistaTarifas() throws Exception {
        // Initialize the database
        transportistaTarifaRepository.saveAndFlush(transportistaTarifa);

        // Get all the transportistaTarifaList
        restTransportistaTarifaMockMvc.perform(get("/api/transportista-tarifas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transportistaTarifa.getId().intValue())))
            .andExpect(jsonPath("$.[*].rangoMinimo").value(hasItem(DEFAULT_RANGO_MINIMO.intValue())))
            .andExpect(jsonPath("$.[*].rangoMaximo").value(hasItem(DEFAULT_RANGO_MAXIMO.intValue())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.intValue())));
    }
    
    @Test
    @Transactional
    public void getTransportistaTarifa() throws Exception {
        // Initialize the database
        transportistaTarifaRepository.saveAndFlush(transportistaTarifa);

        // Get the transportistaTarifa
        restTransportistaTarifaMockMvc.perform(get("/api/transportista-tarifas/{id}", transportistaTarifa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(transportistaTarifa.getId().intValue()))
            .andExpect(jsonPath("$.rangoMinimo").value(DEFAULT_RANGO_MINIMO.intValue()))
            .andExpect(jsonPath("$.rangoMaximo").value(DEFAULT_RANGO_MAXIMO.intValue()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTransportistaTarifa() throws Exception {
        // Get the transportistaTarifa
        restTransportistaTarifaMockMvc.perform(get("/api/transportista-tarifas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransportistaTarifa() throws Exception {
        // Initialize the database
        transportistaTarifaRepository.saveAndFlush(transportistaTarifa);

        int databaseSizeBeforeUpdate = transportistaTarifaRepository.findAll().size();

        // Update the transportistaTarifa
        TransportistaTarifa updatedTransportistaTarifa = transportistaTarifaRepository.findById(transportistaTarifa.getId()).get();
        // Disconnect from session so that the updates on updatedTransportistaTarifa are not directly saved in db
        em.detach(updatedTransportistaTarifa);
        updatedTransportistaTarifa
            .rangoMinimo(UPDATED_RANGO_MINIMO)
            .rangoMaximo(UPDATED_RANGO_MAXIMO)
            .precio(UPDATED_PRECIO);
        TransportistaTarifaDTO transportistaTarifaDTO = transportistaTarifaMapper.toDto(updatedTransportistaTarifa);

        restTransportistaTarifaMockMvc.perform(put("/api/transportista-tarifas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTarifaDTO)))
            .andExpect(status().isOk());

        // Validate the TransportistaTarifa in the database
        List<TransportistaTarifa> transportistaTarifaList = transportistaTarifaRepository.findAll();
        assertThat(transportistaTarifaList).hasSize(databaseSizeBeforeUpdate);
        TransportistaTarifa testTransportistaTarifa = transportistaTarifaList.get(transportistaTarifaList.size() - 1);
        assertThat(testTransportistaTarifa.getRangoMinimo()).isEqualTo(UPDATED_RANGO_MINIMO);
        assertThat(testTransportistaTarifa.getRangoMaximo()).isEqualTo(UPDATED_RANGO_MAXIMO);
        assertThat(testTransportistaTarifa.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingTransportistaTarifa() throws Exception {
        int databaseSizeBeforeUpdate = transportistaTarifaRepository.findAll().size();

        // Create the TransportistaTarifa
        TransportistaTarifaDTO transportistaTarifaDTO = transportistaTarifaMapper.toDto(transportistaTarifa);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransportistaTarifaMockMvc.perform(put("/api/transportista-tarifas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transportistaTarifaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransportistaTarifa in the database
        List<TransportistaTarifa> transportistaTarifaList = transportistaTarifaRepository.findAll();
        assertThat(transportistaTarifaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransportistaTarifa() throws Exception {
        // Initialize the database
        transportistaTarifaRepository.saveAndFlush(transportistaTarifa);

        int databaseSizeBeforeDelete = transportistaTarifaRepository.findAll().size();

        // Delete the transportistaTarifa
        restTransportistaTarifaMockMvc.perform(delete("/api/transportista-tarifas/{id}", transportistaTarifa.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TransportistaTarifa> transportistaTarifaList = transportistaTarifaRepository.findAll();
        assertThat(transportistaTarifaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
