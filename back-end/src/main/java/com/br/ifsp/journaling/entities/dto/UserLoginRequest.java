package com.br.ifsp.journaling.entities.dto;

import lombok.*;
import org.springframework.stereotype.*;

import javax.validation.constraints.*;

public class UserLoginRequest {

    @NotEmpty
    private String nome;
    @NotEmpty
    private String login;

    @NotEmpty
    private String senha;

    public UserLoginRequest(String nome, String login, String senha) {
        this.login = login;
        this.senha = senha;
        this.nome = nome;
    }

    public UserLoginRequest() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public String toString() {
        return "UserLoginRequest{" +
                "login='" + login + '\'' +
                ", senha='" + senha + '\'' +
                '}';
    }
}
