package com.br.ifsp.journaling.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.cglib.core.*;

import java.time.*;
import java.util.*;

@Entity
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonProperty(value = "idUsuario")
    private Long idUsuario;
    @ManyToOne
    private Projeto projeto;
    private Long idProjeto;
    private String titulo;
    private String descricao;
    private Date data;
    private String status;
    private LocalDateTime dataCriacao = LocalDateTime.now();
    private LocalDateTime dataAlteracao;
    private LocalDateTime dataExclusao;

    public Tarefa(Long id, Long idUsuario, Projeto projeto, Long idProjeto, String titulo, String descricao, Date data, String status, LocalDateTime dataCriacao, LocalDateTime dataAlteracao, LocalDateTime dataExclusao) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.projeto = projeto;
        this.idProjeto = idProjeto;
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.status = status;
        this.dataCriacao = dataCriacao;
        this.dataAlteracao = dataAlteracao;
        this.dataExclusao = dataExclusao;
    }

    public Tarefa() {
    }

    @Override
    public String toString() {
        return "Tarefa{" +
                "id=" + id +
                ", projeto=" + projeto +
                ", dataCriacao=" + dataCriacao +
                ", dataAlteracao=" + dataAlteracao +
                ", dataExclusao=" + dataExclusao +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tarefa tarefa = (Tarefa) o;
        return Objects.equals(id, tarefa.id) && Objects.equals(projeto, tarefa.projeto) && Objects.equals(dataCriacao, tarefa.dataCriacao) && Objects.equals(dataAlteracao, tarefa.dataAlteracao) && Objects.equals(dataExclusao, tarefa.dataExclusao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, projeto, dataCriacao, dataAlteracao, dataExclusao);
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdProjeto() {
        return idProjeto;
    }

    public void setIdProjeto(Long idProjeto) {
        this.idProjeto = idProjeto;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Projeto getProjeto() {
        return projeto;
    }

    public void setProjeto(Projeto projeto) {
        this.projeto = projeto;
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
}