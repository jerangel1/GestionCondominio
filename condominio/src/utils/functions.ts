export const formatNumber = (value: string | number | null = 0): string => {
  // Convertir a número si es una cadena de texto
  const number = typeof value === "string" ? parseFloat(value) : value;

  // Verificar si el número es válido o null
  if (number === null || isNaN(number)) return "";

  // Convertir el número a string y dividirlo en partes separadas por cada 3 dígitos
  const parts = number.toFixed(2).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Unir las partes con el separador decimal
  return parts.join(",");
};

export const formatDni = (numero: number): string => {
  const numeroCadena = numero.toString();
  const stringLen = numeroCadena.length;

  let numeroInvertido = numeroCadena.split("").reverse().join("");
  numeroInvertido = numeroInvertido.replace(/\d{3}/g, "$&.");

  if (stringLen % 3 === 0) {
    numeroInvertido = numeroInvertido.slice(0, -1);
  }
  
  numeroInvertido = numeroInvertido.split("").reverse().join("");
  return numeroInvertido;
};
