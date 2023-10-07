import { readable } from "svelte/store";

function adjustKeys_(data) {
  const processed = {};
  const reference = {
    "Título": "titulo", "Asignatura": "asignatura", "Autor": "autor", "Dificultad": "dificultad", "Competencia": "competencia",
    "Concepto": "concepto", "Contexto": "contexto", "Claves": "claves", "Definiciones": "definiciones", "Requisitos": "requisitos",
    "Habilidades": "habilidades", "Imagen principal": "imagen"
  }
  const imagenUrlBase = "https://lh3.googleusercontent.com/d/";
  for (let [expression, newkey] of Object.entries(reference)) {
    const regex = new RegExp(`^["]?${expression}:`);
    const keys = Object.keys(data);
    for (let k of keys) {
      if (regex.test(k) === true) {
        processed[newkey] = data[k]
        break
      }
    }
  }

  if (processed.imagen !== undefined) {
    const groups = /id=(?<id>[a-z0-9]*)/i.exec(processed.imagen).groups;
    if (groups !== undefined) {
      processed.imagenUrl = imagenUrlBase + groups.id;
    }
  }
  return processed
}

export const adjustKeys = readable(adjustKeys_);