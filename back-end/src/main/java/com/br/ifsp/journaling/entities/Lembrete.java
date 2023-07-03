package com.br.ifsp.journaling.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.*;
import java.util.*;

@Entity
public class Lembrete {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @ManyToOne
    private User user;

    private Long idUsuario;

    @JsonProperty(value = "anotacao")
    private String anotacao;

    private Date data;

    private String descricao;

    private LocalDateTime dataCriacao = LocalDateTime.now();

    private LocalDateTime dataAlteracao;

    private LocalDateTime dataExclusao;

    public Lembrete(Long id, Long idUsuario, Date data, User user, String descricao, String anotacao, LocalDateTime dataCriacao, LocalDateTime dataAlteracao, LocalDateTime dataExclusao) {
        Id = id;
        this.idUsuario = idUsuario;
        this.data = data;
        this.descricao = descricao;
        this.user = user;
        this.anotacao = anotacao;
        this.dataCriacao = dataCriacao;
        this.dataAlteracao = dataAlteracao;
        this.dataExclusao = dataExclusao;
    }

    public Lembrete() {
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAnotacao() {
        return anotacao;
    }

    public void setAnotacao(String anotacao) {
        this.anotacao = anotacao;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDateTime getDataAlteracao() {
        return dataAlteracao;
    }

    public void setDataAlteracao(LocalDateTime dataAlteracao) {
        this.dataAlteracao = dataAlteracao;
    }

    public LocalDateTime getDataExclusao() {
        return dataExclusao;
    }

    public void setDataExclusao(LocalDateTime dataExclusao) {
        this.dataExclusao = dataExclusao;
    }

    @Override
    public String toString() {
        return "Lembrete{" +
                "Id=" + Id +
                ", user=" + user +
                ", anotacao='" + anotacao + '\'' +
                ", dataCriacao=" + dataCriacao +
                ", dataAlteracao=" + dataAlteracao +
                ", dataExclusao=" + dataExclusao +
                '}';
    }
}
