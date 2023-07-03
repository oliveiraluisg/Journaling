package com.br.ifsp.journaling.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
public class TokenUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;

    private String email;

    public TokenUser(Long ID, String email) {
        this.ID = ID;
        this.email = email;
    }

    public TokenUser() {
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "TokenUser{" +
                "ID=" + ID +
                ", email='" + email + '\'' +
                '}';
    }
}
