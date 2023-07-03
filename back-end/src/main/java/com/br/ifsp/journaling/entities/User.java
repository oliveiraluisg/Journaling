package com.br.ifsp.journaling.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;

    private String nome;

    private String login;

    private String senha;

    public User(Long ID, String login, String senha, String nome) {
        this.ID = ID;
        this.login = login;
        this.senha = senha;
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public User() {
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
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
        return "User{" +
                "ID=" + ID +
                ", login='" + login + '\'' +
                ", senha='" + senha + '\'' +
                '}';
    }
}
