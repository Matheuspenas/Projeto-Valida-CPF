function validarCpf(cpf) {
  cpf = cpf.replace(/\D/g, ""); // remove tudo que não é dígito
  if (cpf.length !== 11) return false;

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

document.getElementById("cpf").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito

  if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

  // Aplica a máscara: 123.456.789-01
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  e.target.value = value;
});

document.getElementById("formcpf").addEventListener("submit", function (e) {
  e.preventDefault();

  const cpfInput = document.getElementById("cpf").value;
  const messageDiv = document.getElementById("menssage");

  if (validarCpf(cpfInput)) {
    messageDiv.textContent = "CPF Válido";
    messageDiv.className = "message sucess";
  } else {
    messageDiv.textContent = "CPF Inválido";
    messageDiv.className = "message erro";
  }

  messageDiv.style.display = "block";

  setTimeout(() => {
    messageDiv.style.display = "none";
    messageDiv.textContent = "";
    document.getElementById("formcpf").reset();
  }, 5000);
});
