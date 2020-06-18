package mx.com.sharkit.web.rest;

import mx.com.sharkit.service.InventarioService;
import mx.com.sharkit.web.rest.errors.BadRequestAlertException;
import mx.com.sharkit.service.dto.InventarioDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link mx.com.sharkit.domain.Inventario}.
 */
@RestController
@RequestMapping("/api")
public class InventarioResource {

    private final Logger log = LoggerFactory.getLogger(InventarioResource.class);

    private static final String ENTITY_NAME = "inventario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InventarioService inventarioService;

    public InventarioResource(InventarioService inventarioService) {
        this.inventarioService = inventarioService;
    }

    /**
     * {@code POST  /inventarios} : Create a new inventario.
     *
     * @param inventarioDTO the inventarioDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inventarioDTO, or with status {@code 400 (Bad Request)} if the inventario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inventarios")
    public ResponseEntity<InventarioDTO> createInventario(@Valid @RequestBody InventarioDTO inventarioDTO) throws URISyntaxException {
        log.debug("REST request to save Inventario : {}", inventarioDTO);
        if (inventarioDTO.getId() != null) {
            throw new BadRequestAlertException("A new inventario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InventarioDTO result = inventarioService.save(inventarioDTO);
        return ResponseEntity.created(new URI("/api/inventarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inventarios} : Updates an existing inventario.
     *
     * @param inventarioDTO the inventarioDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inventarioDTO,
     * or with status {@code 400 (Bad Request)} if the inventarioDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inventarioDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inventarios")
    public ResponseEntity<InventarioDTO> updateInventario(@Valid @RequestBody InventarioDTO inventarioDTO) throws URISyntaxException {
        log.debug("REST request to update Inventario : {}", inventarioDTO);
        if (inventarioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InventarioDTO result = inventarioService.save(inventarioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inventarioDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /inventarios} : get all the inventarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inventarios in body.
     */
    @GetMapping("/inventarios")
    public List<InventarioDTO> getAllInventarios() {
        log.debug("REST request to get all Inventarios");
        return inventarioService.findAll();
    }

    /**
     * {@code GET  /inventarios/:id} : get the "id" inventario.
     *
     * @param id the id of the inventarioDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inventarioDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inventarios/{id}")
    public ResponseEntity<InventarioDTO> getInventario(@PathVariable Long id) {
        log.debug("REST request to get Inventario : {}", id);
        Optional<InventarioDTO> inventarioDTO = inventarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inventarioDTO);
    }

    /**
     * {@code DELETE  /inventarios/:id} : delete the "id" inventario.
     *
     * @param id the id of the inventarioDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inventarios/{id}")
    public ResponseEntity<Void> deleteInventario(@PathVariable Long id) {
        log.debug("REST request to delete Inventario : {}", id);
        inventarioService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
