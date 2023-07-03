package com.br.ifsp.journaling.controller;

import com.br.ifsp.journaling.entities.*;
import com.br.ifsp.journaling.entities.dto.*;
import com.br.ifsp.journaling.repository.LembreteRepository;
import com.br.ifsp.journaling.service.TokenService;
import org.apache.coyote.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/lembrete")
@CrossOrigin(origins = {"http://localhost:4200"})
public class LembreteController {

    @Autowired
    private LembreteRepository repository;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<Object> criaLembrete(@RequestBody LembreteRequest lembrete, @RequestHeader String token) {

        Lembrete lembreteDB = new Lembrete();
        lembreteDB.setAnotacao(lembrete.getAnotacao());
        lembreteDB.setDescricao(lembrete.getDescricao());
        lembreteDB.setData(lembrete.getData());
        lembreteDB.setIdUsuario(lembrete.getIdUsuario());

        repository.save(lembreteDB);

        return new ResponseEntity<>(HttpStatus.CREATED);


    }

    @GetMapping
    public ResponseEntity<Object> retornaLembretes(@RequestParam Long idUsuario) {

        List<Lembrete> lembrete = repository.findByIdUsuario(idUsuario);

        if (!lembrete.isEmpty()) {

            return new ResponseEntity<>(lembrete, HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping
    public ResponseEntity<Object> atualizaLembrete(@RequestBody Lembrete lembreteRequest, @RequestHeader String token) {

        Lembrete novoLembrete = new Lembrete();

        novoLembrete.setId(lembreteRequest.getId());
        novoLembrete.setAnotacao(lembreteRequest.getAnotacao());
        novoLembrete.setUser(lembreteRequest.getUser());
        novoLembrete.setDataAlteracao(LocalDateTime.now());

        repository.save(novoLembrete);

        return new ResponseEntity<>(HttpStatus.OK);

    }


    @DeleteMapping
    public ResponseEntity<Object> deletaLembrete(@RequestHeader Long idLembrete, @RequestHeader String token) {

        Optional<Lembrete> lembrete = repository.findById(idLembrete);

        if (!lembrete.isEmpty()) {

            repository.delete(lembrete.get());

            return new ResponseEntity<>(HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }


}
