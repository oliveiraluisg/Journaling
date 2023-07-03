package com.br.ifsp.journaling.repository;

import com.br.ifsp.journaling.entities.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    List<Projeto> findByIdUsuario(String idUsuario);
}