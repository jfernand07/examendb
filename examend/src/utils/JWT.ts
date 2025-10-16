// src/utils/jwt.ts
export function getJwtExpiresIn(): number | string {
const envValue = process.env.JWT_EXPIRES_IN;
  if (!envValue) return "2h"; // valor por defecto

const numeric = Number(envValue);
  return isNaN(numeric) ? envValue : numeric; // si es número devuelve number, si no string
}
