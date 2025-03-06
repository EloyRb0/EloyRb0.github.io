//http es la libreria que nos permite crear servidores utilizando puertos locales de nuestro equipo
import http from 'http';
//fs es una libreria que nos va a permitir manipular archivos, ya sea lectura o escritura
import fs from 'fs';

    function darBienvenida(req, res) {
      fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
           //500 es cuando hay un error interno de servidor, es el identificador por asi llamarlo de un error
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oh no!!!!');
          return;
        }
        //200 es la manera de declarar que todo salió bien en este contexto de un servidor y request
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }

    function getEscuelas(req, res) {
        //Esto representa un objeto JSON de una escuela
        const escuelas = {
            "escuelas" : [
              {
              "nombre": "Escuela Benito Juárez",
            "direccion": "Av. Principal 123, Ciudad de México"
            },
            {
              "nombre": "Escuela Vicente Fox",
            "direccion": "Av. Secundaria 456, Ciudad de México"
            }
            ]
          };  
      res.writeHead(200, { 'Content-Type': 'application/json' });
      //Stringify es necesario porque para que el cliente reciba lo que está esperando en el formato correcto: una cadena JSON formateada adecuadamente, que es lo que hace stringify, convertirlo en cadena
      res.end(JSON.stringify(escuelas));
    }

    function mostrarEscuelas(req, res) {
        fs.readFile('escuelas.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarDonantes(req, res) {
        fs.readFile('donantes.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarEquipo(req, res) {
        fs.readFile('equipo.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

      function mostrarOpinion(req, res) {
        fs.readFile('opinion.html', 'utf8', (error, data) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

    function getDonantes(req, res) {
      const donantes = {
          "donantes" : [
            {
            "nombre": "Carlos Slim",
            "monto": "100"
            },
            {
            "nombre": "Maria Teresa",
            "monto": "45000"
            }
          ]
        };  
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(donantes));
  }

    function manejarRuta404(req, res) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Oops');
    }

    //https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
    const servidor = http.createServer((req, res) => {
      const url = req.url;

      if (url === '/') {
        darBienvenida(req, res);
      } else if (url === '/api/escuelas') {
        getEscuelas(req, res);
      } else if (url === '/api/donantes') {
        getDonantes(req, res);
      } 
      else if (url === '/escuelas') {
        mostrarEscuelas(req, res);
      } 
      else if (url === '/donantes') {
        mostrarDonantes(req, res);
      } 
      else if (url === '/equipo') {
        mostrarEquipo(req, res);
      } 
      else if (url === '/opinion') {
        mostrarOpinion(req, res);
      } 
      
      else {
        manejarRuta404(req, res);
      }
    });

    const puerto = 1984;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en supertarea un enlace a servidor.js y al resto de los html