package cl.duoc.cuidapet.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.duoc.cuidapet.model.User;
import cl.duoc.cuidapet.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User register(User user) {
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("DUENO");
        }
        return userRepository.save(user);
    }

    public User validateLogin(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!user.getPassword().equals(rawPassword)) {
            throw new RuntimeException("Credenciales inválidas");
        }
        return user;
    }

    public User create(User user) {
        return userRepository.save(user);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User getById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public User update(Long id, User user) {
        User existing = getById(id);
        existing.setName(user.getName());
        existing.setEmail(user.getEmail());
        existing.setPassword(user.getPassword());
        existing.setRole(user.getRole());
        return userRepository.save(existing);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
