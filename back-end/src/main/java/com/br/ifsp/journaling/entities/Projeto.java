package com.br.ifsp.journaling.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.*;
import java.util.*;

@Entity
@Table(name = "projeto")
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titulo;
    private Date dataInicio;
    @JsonProperty(value = "idUsuario")
    private String idUsuario;
    private Date dataTermino;
    private String descricao;
    @OneToMany
    private List<Tarefa> tarefas;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAlteracao;
    private LocalDateTime dataExclusao;

    public Projeto() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Projeto projeto = (Projeto) o;
        return Objects.equals(id, projeto.id) && Objects.equals(tarefas, projeto.tarefas) && Objects.equals(dataCriacao, projeto.dataCriacao) && Objects.equals(dataAlteracao, projeto.dataAlteracao) && Objects.equals(dataExclusao, projeto.dataExclusao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, tarefas, dataCriacao, dataAlteracao, dataExclusao);
    }

    @Override
    public String toString() {
        return "Projeto{" +
                "id=" + id +
                ", tarefas=" + tarefas +
                ", dataCriacao=" + dataCriacao +
                ", dataAlteracao=" + dataAlteracao +
                ", dataExclusao=" + dataExclusao +
                '}';
    }

    public Projeto(Long id, String titulo, Date dataInicio, String idUsuario, Date dataTermino, String descricao, List<Tarefa> tarefas, LocalDateTime dataCriacao, LocalDateTime dataAlteracao, LocalDateTime dataExclusao) {
        this.id = id;
        this.titulo = titulo;
        this.dataInicio = dataInicio;
        this.idUsuario = idUsuario;
        this.dataTermino = dataTermino;
        this.descricao = descricao;
        this.tarefas = tarefas;
        this.dataCriacao = dataCriacao;
        this.dataAlteracao = dataAlteracao;
        this.dataExclusao = dataExclusao;
    }

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(Date dataTermino) {
        this.dataTermino = dataTermino;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Tarefa> getTarefas() {
        return tarefas;
    }

    public void setTarefas(List<Tarefa> tarefas) {
        this.tarefas = tarefas;
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