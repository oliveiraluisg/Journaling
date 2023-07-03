package com.br.ifsp.journaling.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.*;

@Entity
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long Id;

    private String tokenSeq;

    private LocalDateTime tempoExpiracao;

    public Token(Long id, String tokenSeq, LocalDateTime tempoExpiracao) {
        Id = id;
        this.tokenSeq = tokenSeq;
        this.tempoExpiracao = tempoExpiracao;
    }

    public Token() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getTokenSeq() {
        return tokenSeq;
    }

    public void setTokenSeq(String tokenSeq) {
        this.tokenSeq = tokenSeq;
    }

    public LocalDateTime getTempoExpiracao() {
        return tempoExpiracao;
    }

    public void setTempoExpiracao(LocalDateTime tempoExpiracao) {
        this.tempoExpiracao = tempoExpiracao;
    }

    @Override
    public String toString() {
        return "Token{" +
                "Id=" + Id +
                ", tokenSeq='" + tokenSeq + '\'' +
                ", tempoExpiracao=" + tempoExpiracao +
                '}';
    }
}
