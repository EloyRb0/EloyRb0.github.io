import express from 'express';
import fs from 'fs';

const app = express();
const puerto = 1984;

function leerArchivo(res, archivo) {
  fs.readFile(archivo, 'utf8', (error, data) => {
    if (error) {
      res.status(500).send('Oh no!!!!');
      return;
    }
    res.send(data);
  });
}

app.get('/', (req, res) => leerArchivo(res, 'bienvenida.html'));
app.get('/escuelas', (req, res) => leerArchivo(res, 'escuelas.html'));
app.get('/donantes', (req, res) => leerArchivo(res, 'donantes.html'));
app.get('/equipo', (req, res) => leerArchivo(res, 'equipo.html'));
app.get('/opinion', (req, res) => leerArchivo(res, 'opinion.html'));

app.get('/api/escuelas', (req, res) => {
  const escuelas = {
    "escuelas": [
      { "nombre": "Escuela Benito Juárez", "direccion": "Av. Principal 123, Ciudad de México" },
      { "nombre": "Escuela Vicente Fox", "direccion": "Av. Secundaria 456, Ciudad de México" }
    ]
  };
  res.json(escuelas);
});

app.get('/api/donantes', (req, res) => {
  const donantes = {
    "donantes": [
      { "nombre": "Carlos Slim", "monto": "100" },
      { "nombre": "Maria Teresa", "monto": "45000" }
    ]
  };
  res.json(donantes);
});

app.use((req, res) => res.status(404).send('Oops'));

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
