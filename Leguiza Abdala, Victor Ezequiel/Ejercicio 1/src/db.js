import mysql from 'mysql2/promise';

export const conexionBD = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const inicializarBaseDeDatos = async () => {
  try {
    const crearTablaQuery = `
      CREATE TABLE IF NOT EXISTS tabla_rectangulos (
        id_figura INT AUTO_INCREMENT PRIMARY KEY,
        medida_base DECIMAL(10, 2) NOT NULL,
        medida_altura DECIMAL(10, 2) NOT NULL,
        valor_perimetro DECIMAL(10, 2) NOT NULL,
        valor_superficie DECIMAL(12, 4) NOT NULL
      );
    `;
    await conexionBD.query(crearTablaQuery);
    console.log("Tabla 'tabla_rectangulos' creada");
  } catch (error) {
    console.error("Error al crear la tabla:", error);
  }
};

inicializarBaseDeDatos();