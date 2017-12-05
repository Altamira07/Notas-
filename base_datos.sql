CREATE TABLE Usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  apaterno VARCHAR(100),
  amaterno VARCHAR(100),
  correo VARCHAR(100),
  contrasena VARCHAR(100),
  foto VARCHAR(255),
  toke VARCHAR(255),
  creado DATETIME,
  actualizado DATETIME
);


CREATE TABLE Nota (
  id int AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100),
  contenido text,
  creada DATETIME,
  actualizada DATETIME,
  id_usuario int,
  CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

CREATE TABLE Imagen(
  id int AUTO_INCREMENT PRIMARY KEY,
  ruta VARCHAR(255),
  creado DATETIME,
  actualizado DATETIME,
  id_nota int,
  CONSTRAINT fk_nota FOREIGN KEY (id_nota) REFERENCES Nota(id)
);


CREATE TABLE Compartir (
  id_nota int,
  id_dueno int,
  id_usuario int,
  CONSTRAINT pk_compartir PRIMARY KEY (id_nota,id_dueno,id_usuario),
  CONSTRAINT fk_nota_compartir FOREIGN KEY (id_nota) REFERENCES Nota(id),
  CONSTRAINT fk_usuario_dueno FOREIGN KEY (id_dueno) REFERENCES Usuario(id),
  CONSTRAINT fk_usuario_compartir FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

DROP TABLE Compartir;
SELECT * FROM Compartir;
