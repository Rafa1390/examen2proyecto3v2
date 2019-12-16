package com.cenfotec.examen2.web.rest;

import com.cenfotec.examen2.domain.Period;
import com.cenfotec.examen2.repository.PeriodRepository;
import com.cenfotec.examen2.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cenfotec.examen2.domain.Period}.
 */
@RestController
@RequestMapping("/api")
public class PeriodResource {

    private final Logger log = LoggerFactory.getLogger(PeriodResource.class);

    private static final String ENTITY_NAME = "period";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PeriodRepository periodRepository;

    public PeriodResource(PeriodRepository periodRepository) {
        this.periodRepository = periodRepository;
    }

    /**
     * {@code POST  /periods} : Create a new period.
     *
     * @param period the period to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new period, or with status {@code 400 (Bad Request)} if the period has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/periods")
    public ResponseEntity<Period> createPeriod(@RequestBody Period period) throws URISyntaxException {
        log.debug("REST request to save Period : {}", period);
        if (period.getId() != null) {
            throw new BadRequestAlertException("A new period cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Period result = periodRepository.save(period);
        return ResponseEntity.created(new URI("/api/periods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /periods} : Updates an existing period.
     *
     * @param period the period to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated period,
     * or with status {@code 400 (Bad Request)} if the period is not valid,
     * or with status {@code 500 (Internal Server Error)} if the period couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/periods")
    public ResponseEntity<Period> updatePeriod(@RequestBody Period period) throws URISyntaxException {
        log.debug("REST request to update Period : {}", period);
        if (period.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Period result = periodRepository.save(period);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, period.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /periods} : get all the periods.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of periods in body.
     */
    @GetMapping("/periods")
    public ResponseEntity<List<Period>> getAllPeriods(Pageable pageable) {
        log.debug("REST request to get a page of Periods");
        Page<Period> page = periodRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /periods/:id} : get the "id" period.
     *
     * @param id the id of the period to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the period, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/periods/{id}")
    public ResponseEntity<Period> getPeriod(@PathVariable Long id) {
        log.debug("REST request to get Period : {}", id);
        Optional<Period> period = periodRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(period);
    }

    /**
     * {@code DELETE  /periods/:id} : delete the "id" period.
     *
     * @param id the id of the period to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/periods/{id}")
    public ResponseEntity<Void> deletePeriod(@PathVariable Long id) {
        log.debug("REST request to delete Period : {}", id);
        periodRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
