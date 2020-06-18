package mx.com.sharkit.web.rest;

import mx.com.sharkit.AbastosApp;
import mx.com.sharkit.domain.HistoricoPedido;
import mx.com.sharkit.repository.HistoricoPedidoRepository;
import mx.com.sharkit.service.HistoricoPedidoService;
import mx.com.sharkit.service.dto.HistoricoPedidoDTO;
import mx.com.sharkit.service.mapper.HistoricoPedidoMapper;

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
 * Integration tests for the {@link HistoricoPedidoResource} REST controller.
 */
@SpringBootTest(classes = AbastosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class HistoricoPedidoResourceIT {

    private static final LocalDate DEFAULT_FECHA_ESTATUS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ESTATUS = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private HistoricoPedidoRepository historicoPedidoRepository;

    @Autowired
    private HistoricoPedidoMapper historicoPedidoMapper;

    @Autowired
    private HistoricoPedidoService historicoPedidoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistoricoPedidoMockMvc;

    private HistoricoPedido historicoPedido;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoricoPedido createEntity(EntityManager em) {
        HistoricoPedido historicoPedido = new HistoricoPedido()
            .fechaEstatus(DEFAULT_FECHA_ESTATUS);
        return historicoPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoricoPedido createUpdatedEntity(EntityManager em) {
        HistoricoPedido historicoPedido = new HistoricoPedido()
            .fechaEstatus(UPDATED_FECHA_ESTATUS);
        return historicoPedido;
    }

    @BeforeEach
    public void initTest() {
        historicoPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoricoPedido() throws Exception {
        int databaseSizeBeforeCreate = historicoPedidoRepository.findAll().size();
        // Create the HistoricoPedido
        HistoricoPedidoDTO historicoPedidoDTO = historicoPedidoMapper.toDto(historicoPedido);
        restHistoricoPedidoMockMvc.perform(post("/api/historico-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoPedidoDTO)))
            .andExpect(status().isCreated());

        // Validate the HistoricoPedido in the database
        List<HistoricoPedido> historicoPedidoList = historicoPedidoRepository.findAll();
        assertThat(historicoPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        HistoricoPedido testHistoricoPedido = historicoPedidoList.get(historicoPedidoList.size() - 1);
        assertThat(testHistoricoPedido.getFechaEstatus()).isEqualTo(DEFAULT_FECHA_ESTATUS);
    }

    @Test
    @Transactional
    public void createHistoricoPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historicoPedidoRepository.findAll().size();

        // Create the HistoricoPedido with an existing ID
        historicoPedido.setId(1L);
        HistoricoPedidoDTO historicoPedidoDTO = historicoPedidoMapper.toDto(historicoPedido);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoricoPedidoMockMvc.perform(post("/api/historico-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoPedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HistoricoPedido in the database
        List<HistoricoPedido> historicoPedidoList = historicoPedidoRepository.findAll();
        assertThat(historicoPedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHistoricoPedidos() throws Exception {
        // Initialize the database
        historicoPedidoRepository.saveAndFlush(historicoPedido);

        // Get all the historicoPedidoList
        restHistoricoPedidoMockMvc.perform(get("/api/historico-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historicoPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaEstatus").value(hasItem(DEFAULT_FECHA_ESTATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getHistoricoPedido() throws Exception {
        // Initialize the database
        historicoPedidoRepository.saveAndFlush(historicoPedido);

        // Get the historicoPedido
        restHistoricoPedidoMockMvc.perform(get("/api/historico-pedidos/{id}", historicoPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historicoPedido.getId().intValue()))
            .andExpect(jsonPath("$.fechaEstatus").value(DEFAULT_FECHA_ESTATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingHistoricoPedido() throws Exception {
        // Get the historicoPedido
        restHistoricoPedidoMockMvc.perform(get("/api/historico-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoricoPedido() throws Exception {
        // Initialize the database
        historicoPedidoRepository.saveAndFlush(historicoPedido);

        int databaseSizeBeforeUpdate = historicoPedidoRepository.findAll().size();

        // Update the historicoPedido
        HistoricoPedido updatedHistoricoPedido = historicoPedidoRepository.findById(historicoPedido.getId()).get();
        // Disconnect from session so that the updates on updatedHistoricoPedido are not directly saved in db
        em.detach(updatedHistoricoPedido);
        updatedHistoricoPedido
            .fechaEstatus(UPDATED_FECHA_ESTATUS);
        HistoricoPedidoDTO historicoPedidoDTO = historicoPedidoMapper.toDto(updatedHistoricoPedido);

        restHistoricoPedidoMockMvc.perform(put("/api/historico-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoPedidoDTO)))
            .andExpect(status().isOk());

        // Validate the HistoricoPedido in the database
        List<HistoricoPedido> historicoPedidoList = historicoPedidoRepository.findAll();
        assertThat(historicoPedidoList).hasSize(databaseSizeBeforeUpdate);
        HistoricoPedido testHistoricoPedido = historicoPedidoList.get(historicoPedidoList.size() - 1);
        assertThat(testHistoricoPedido.getFechaEstatus()).isEqualTo(UPDATED_FECHA_ESTATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoricoPedido() throws Exception {
        int databaseSizeBeforeUpdate = historicoPedidoRepository.findAll().size();

        // Create the HistoricoPedido
        HistoricoPedidoDTO historicoPedidoDTO = historicoPedidoMapper.toDto(historicoPedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoricoPedidoMockMvc.perform(put("/api/historico-pedidos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoPedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HistoricoPedido in the database
        List<HistoricoPedido> historicoPedidoList = historicoPedidoRepository.findAll();
        assertThat(historicoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoricoPedido() throws Exception {
        // Initialize the database
        historicoPedidoRepository.saveAndFlush(historicoPedido);

        int databaseSizeBeforeDelete = historicoPedidoRepository.findAll().size();

        // Delete the historicoPedido
        restHistoricoPedidoMockMvc.perform(delete("/api/historico-pedidos/{id}", historicoPedido.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistoricoPedido> historicoPedidoList = historicoPedidoRepository.findAll();
        assertThat(historicoPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
