package cl.duoc.cuidapet.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.duoc.cuidapet.dto.LoginDTO;
import cl.duoc.cuidapet.dto.UserDTO;
import cl.duoc.cuidapet.model.User;
import cl.duoc.cuidapet.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class UserController {
    
 private final UserService userService;

    // 🔹 Registro
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody User user) {
        User created = userService.register(user);
        return ResponseEntity.ok(UserDTO.builder()
            .id(created.getId())
            .name(created.getName())
            .email(created.getEmail())
            .role(created.getRole())
            .build());
    }

    // 🔹 Login
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginDTO dto) {
        User user = userService.validateLogin(dto.getEmail(), dto.getPassword());
        return ResponseEntity.ok(UserDTO.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .role(user.getRole())
            .build());
    }

    // 🔹 Crear usuario (CRUD)
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(userService.create(user));
    }

    // 🔹 Listar todos
    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }

    // 🔹 Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    // 🔹 Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.update(id, user));
    }

    // 🔹 Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
