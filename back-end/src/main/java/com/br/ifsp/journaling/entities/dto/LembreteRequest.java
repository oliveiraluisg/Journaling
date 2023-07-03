package com.br.ifsp.journaling.entities.dto;

import com.br.ifsp.journaling.entities.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.*;
import java.util.*;

public class LembreteRequest {

    private User user;

    private Long idUsuario;

    private Date data;

    private String anotacao;

    private String descricao;

    private LocalDateTime dataCriacao = LocalDateTime.now();

    private LocalDateTime dataAlteracao;

    private LocalDateTime dataExclusao;

    public LembreteRequest(User user, Long idUsuario, Date data,String descricao, String anotacao, LocalDateTime dataCriacao, LocalDateTime dataAlteracao, LocalDateTime dataExclusao) {
        this.data = data;
        this.idUsuario = idUsuario;
        this.descricao = descricao;
        this.user = user;
        this.anotacao = anotacao;
        this.dataCriacao = dataCriacao;
        this.dataAlteracao = dataAlteracao;
        this.dataExclusao = dataExclusao;
    }

    public Date getData() {
        return data;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
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

    public LembreteRequest() {
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
        return "LembreteRequest{" +
                "user=" + user +
                ", anotacao='" + anotacao + '\'' +
                ", dataCriacao=" + dataCriacao +
                ", dataAlteracao=" + dataAlteracao +
                ", dataExclusao=" + dataExclusao +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LembreteRequest that = (LembreteRequest) o;
        return Objects.equals(user, that.user) && Objects.equals(anotacao, that.anotacao) && Objects.equals(dataCriacao, that.dataCriacao) && Objects.equals(dataAlteracao, that.dataAlteracao) && Objects.equals(dataExclusao, that.dataExclusao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, anotacao, dataCriacao, dataAlteracao, dataExclusao);
    }
}
