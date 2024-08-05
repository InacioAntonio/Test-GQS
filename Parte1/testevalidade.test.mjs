// Função a ser testada
const existingUsers = ["user1", "user2", "user3"];
function validateUserAndPassword(username, password) {
  const MIN_USERNAME_LENGTH = 5;
  const MIN_PASSWORD_LENGTH = 8;

  // Função para validar o nome de usuário
  function validateUsername(username) {
    if (username.length < MIN_USERNAME_LENGTH) {
      return {
        valid: false,
        message: "Nome de usuário deve ter pelo menos 5 caracteres.",
      };
    }
    if (existingUsers.includes(username)) {
      return { valid: false, message: "Nome de usuário já existe." };
    }
    return { valid: true };
  }

  // Função para validar a senha e determinar o nível de segurança
  function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= MIN_PASSWORD_LENGTH;
    let level = 0;
    if (hasMinLength) level++;
    if (hasUpperCase) level++;
    if (hasLowerCase) level++;
    if (hasSpecialChar) level++;
    let strength;
    switch (level) {
      case 1:
        strength = "Muito Fraca";
        break;
      case 2:
        strength = "Fraca";
        break;
      case 3:
        strength = "Média";
        break;
      case 4:
        strength = "Forte";
        break;
      default:
        strength = "Muito Fraca";
    }
    if (level < 4) {
      return {
        valid: false,
        message:
          "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais.",
        strength,
      };
    }
    return { valid: true, strength };
  }

  // Validações
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.valid) {
    return usernameValidation;
  }
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  // Adiciona o usuário à lista se for válido
  existingUsers.push(username);
  return {
    valid: true,
    message: "Usuário e senha válidos.",
    strength: passwordValidation.strength,
  };
}

// Testes
import { expect } from "chai";

describe("validateUserAndPassword", () => {
  it("deve retornar erro se o nome de usuário for muito curto", () => {
    const result = validateUserAndPassword("usr", "Password123!");
    expect(result.valid).to.be.false;
    expect(result.message).to.equal(
      "Nome de usuário deve ter pelo menos 5 caracteres."
    );
  });

  it("deve retornar erro se o nome de usuário já existir", () => {
    const result = validateUserAndPassword("user1", "Password123!");
    expect(result.valid).to.be.false;
    expect(result.message).to.equal("Nome de usuário já existe.");
  });

  it("deve retornar erro se a senha for muito curta", () => {
    const result = validateUserAndPassword("newuser", "12345");
    expect(result.valid).to.be.false;
    expect(result.message).to.equal(
      "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais."
    );
  });

  it("deve retornar erro se a senha não contiver caracteres maiúsculos", () => {
    const result = validateUserAndPassword("newuser", "password123!");
    expect(result.valid).to.be.false;
    expect(result.message).to.equal(
      "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais."
    );
  });

  it("deve retornar erro se a senha não contiver caracteres minúsculos", () => {
    const result = validateUserAndPassword("newuser", "PASSWORD123!");
    expect(result.valid).to.be.false;
    expect(result.message).to.equal(
      "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais."
    );
  });

  it("deve retornar erro se a senha não contiver caracteres especiais", () => {
    const result = validateUserAndPassword("newuser", "Password123");
    expect(result.valid).to.be.false;
    expect(result.message).to.equal(
      "Senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e caracteres especiais."
    );
  });

  it("deve retornar sucesso se o nome de usuário e a senha forem válidos", () => {
    const result = validateUserAndPassword("newuser", "Password123!");
    expect(result.valid).to.be.true;
    expect(result.message).to.equal("Usuário e senha válidos.");
    expect(result.strength).to.equal("Forte");
  });
});
