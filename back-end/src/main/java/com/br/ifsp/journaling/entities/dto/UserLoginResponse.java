package com.br.ifsp.journaling.entities.dto;

import com.br.ifsp.journaling.entities.enums.*;
import com.fasterxml.jackson.annotation.*;
import lombok.*;


public class UserLoginResponse {

    @JsonProperty(value = "response")
    private String response;

    @JsonProperty(value = "status")
    private ResultadoLogin status;

    @JsonProperty(value = "ID")
    private Long idUsuario;

    public UserLoginResponse(String response, ResultadoLogin status, Long idUsuario) {
        this.response = response;
        this.status = status;
        this.idUsuario = idUsuario;
    }

    public UserLoginResponse() {
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public ResultadoLogin getStatus() {
        return status;
    }

    public void setStatus(ResultadoLogin status) {
        this.status = status;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    @Override
    public String toString() {
        return "UserLoginResponse{" +
                "response='" + response + '\'' +
                ", status=" + status +
                ", idUsuario=" + idUsuario +
                '}';
    }
}
