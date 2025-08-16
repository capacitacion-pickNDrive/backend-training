// src/index.ts

export default {
  register() {},

  bootstrap: async ({ strapi }) => {
    const existingTareas = await strapi.db.query('api::tarea.tarea').findMany();

    if (existingTareas.length === 0) {
      const categoria = await strapi.db.query('api::categoria.categoria').create({
        data: {
          nombre: 'Estudio',
          color: '#3498db',
        },
      });

      await strapi.db.query('api::tarea.tarea').create({
        data: {
          titulo: 'Repasar punteros en C',
          descripcion: 'Usar *(p+i) y validar NULL',
          categoria: categoria.id,
        },
      });

      await strapi.db.query('api::tarea.tarea').create({
        data: {
          titulo: 'Configurar roles en Strapi',
          descripcion: 'Limitar acceso a tareas solo a usuarios autenticados',
          categoria: categoria.id,
        },
      });

      console.log('🌱 Tareas de ejemplo creadas');
    }
  },
};
// con una buena restriccion no se duplican
//lo dejo en el codigo, si lo hiciera en la pagina se pierde
//strapi es para la interfaz web mientras que el ide para la logica

//con npx busca el binario de strapi. Si no lo buscaba en el path y no estaba.