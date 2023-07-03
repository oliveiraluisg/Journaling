package com.br.ifsp.journaling.repository;

import com.br.ifsp.journaling.entities.Lembrete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LembreteRepository extends JpaRepository<Lembrete, Long> {

    public List<Lembrete> findByIdUsuario(Long userId);

}
