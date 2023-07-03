package com.br.ifsp.journaling.controller;

import com.br.ifsp.journaling.entities.*;
import com.br.ifsp.journaling.entities.dto.*;
import com.br.ifsp.journaling.entities.enums.*;
import com.br.ifsp.journaling.repository.*;
import com.br.ifsp.journaling.service.*;
import lombok.extern.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.util.*;

@RestController
@RequestMapping(value = "/api/v1/user")
@CrossOrigin(origins = {"http://localhost:4200"})
@Slf4j
public class LoginController {

    @Autowired
    private UserService service;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping(value = "/create")
    public ResponseEntity<Object> criaUsuario(@RequestBody @Valid UserLoginRequest request, @RequestParam String token) {

        if (tokenService.validaToken(token)) {

            User user = new User();

            user.setNome(request.getNome());
            user.setLogin(request.getLogin());
            user.setSenha(request.getSenha());

            UserLoginResponse response = service.criaContaNoBanco(user);

            if (response.getStatus() == ResultadoLogin.CONTA_CRIADA) {
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }

            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping
    public ResponseEntity<Object> retornaNomeUsuario(@RequestParam Long idUsuario){

       Optional<User> user = userRepository.findById(idUsuario);

       if(!user.isEmpty()){
           UserReturnResponse userReturnResponse = new UserReturnResponse();
           userReturnResponse.nome = user.get().getNome();

           return new ResponseEntity<>(userReturnResponse, HttpStatus.OK);
       }

       return null;

    }

    @PostMapping(value = "/validation")
    public ResponseEntity<Object> recebeRequisicaoLogin(@RequestBody @Valid UserLoginRequest request, @RequestParam String token) {

        log.info("Recebendo requisição...");
        log.info("Login recebido ->" + request.toString());

        if (tokenService.validaToken(token)) {

            log.info("Token validado.");

            User user = new User();

            user.setSenha(request.getSenha());
            user.setLogin(request.getLogin());

            UserLoginResponse response = service.validaLogin(user);

            if (response.getStatus() == ResultadoLogin.ERRO_LOGIN) {
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(response, HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @PostMapping(value = "/password")
    public ResponseEntity<Object> redefineSenhaUsuario(@RequestBody @Valid UserLoginRequest request, @RequestParam String token) {


        if (tokenService.validaToken(token)) {

            User user = new User();

            user.setSenha(request.getSenha());
            user.setLogin(request.getLogin());

            UserLoginResponse response = service.redefineSenha(user);

            if (response.getStatus() == ResultadoLogin.USUARIO_INEXISTENTE) {
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(response, HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
