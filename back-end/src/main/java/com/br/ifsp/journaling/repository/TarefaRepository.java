package com.br.ifsp.journaling.repository;

import com.br.ifsp.journaling.entities.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa,Long> {
    List<Tarefa> findByIdUsuario(String idUsuario);
}