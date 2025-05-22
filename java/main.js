document.addEventListener("DOMContentLoaded", function () {
  function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return null; // Retorna null se incompleto

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  const cpfInput = document.getElementById("cpf");
  const messageDiv = document.getElementById("message");
  const form = document.getElementById("formcpf");

  cpfInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    // Aplica a máscara de CPF
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    e.target.value = value;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const cpf = cpfInput.value;
    const status = validarCpf(cpf);

    if (status === null) {
      messageDiv.textContent = "CPF Incompleto";
      applyStyles("incompleto");
    } else if (status) {
      messageDiv.textContent = "CPF Válido";
      applyStyles("valido");
    } else {
      messageDiv.textContent = "CPF Inválido";
      applyStyles("invalido");
    }

    messageDiv.style.display = "block";

    setTimeout(() => {
      messageDiv.style.display = "none";
      messageDiv.textContent = "";
      cpfInput.value = "";
      cpfInput.className = "";
      messageDiv.className = "message";
    }, 5000);
  });

  function applyStyles(status) {
    cpfInput.className = status;
    messageDiv.className = `message ${status}`;
  }
});
