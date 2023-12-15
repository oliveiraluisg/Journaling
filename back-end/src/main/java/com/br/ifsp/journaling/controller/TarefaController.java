package com.br.ifsp.journaling.controller;

import com.br.ifsp.journaling.entities.*;
import com.br.ifsp.journaling.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/api/v1/tarefa")
@CrossOrigin(origins = {"http://localhost:4200"})
public class TarefaController {

    @Autowired
    TarefaRepository repository;

    @PostMapping
    public ResponseEntity<Object> criaTarefa(@RequestBody Tarefa tarefa) {

        if (tarefa.getIdProjeto() == null || tarefa.getTitulo() == null || tarefa.getData() == null || tarefa.getDescricao() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        repository.save(tarefa);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "{id}")
    public Optional<Tarefa> retornaTarefa(@PathVariable Long id) {

        return repository.findById(id);
    }

    @GetMapping //
    public List<Tarefa> retornaTodasTarefasUsuario(@RequestParam String idUsuario) {

        return repository.findByIdUsuario(idUsuario);
    }

    @PutMapping
    public ResponseEntity<Object> atualizaTarefa(@RequestBody Tarefa tarefa) {

        Optional<Tarefa> tarefaDB = repository.findById(tarefa.getId());

        if (!tarefaDB.isEmpty()) {
            tarefaDB.get().setProjeto(tarefa.getProjeto());
            return new ResponseEntity<>(tarefaDB.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping()
    public ResponseEntity<Object> deletaTarefa(@RequestHeader Long id) {
        repository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}