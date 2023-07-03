package com.br.ifsp.journaling.controller;

import com.br.ifsp.journaling.entities.*;
import com.br.ifsp.journaling.repository.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "api/v1/projeto")
@CrossOrigin(value = "http://localhost:4200")
public class ProjetoController {

    @Autowired
    ProjetoRepository repository;

    @PostMapping
    public ResponseEntity<Object> criaProjeto(@RequestBody Projeto projeto){

        repository.save(projeto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "{id}")
    public Optional<Projeto> retornaProjeto(@PathVariable Long id){

        return repository.findById(id);
    }

    @GetMapping
    public List<Projeto> retornaTodosProjetosUsuario(@RequestParam String idUsuario){

        return repository.findByIdUsuario(idUsuario);
    }

    @PutMapping
    public ResponseEntity<Object> atualizaProjeto(@RequestBody Projeto projeto){

        Optional<Projeto> projetoDB = repository.findById(projeto.getId());

        if(!projetoDB.isEmpty()){
            projetoDB.get().setTarefas(projeto.getTarefas());
            return new ResponseEntity<>(projetoDB.get(),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Object> deletaProjeto(@PathVariable Long id){
        repository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}