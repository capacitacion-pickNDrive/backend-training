export default {
    register() {
        // No es necesario tocar esta parte
    },

    async bootstrap({ strapi }) {
        // 1️⃣ Crear categorías si no existen
        const countCat = await strapi.db.query('api::categoria.categoria').count();
        if (countCat === 0) {
            await strapi.db.query('api::categoria.categoria').createMany({
                data: [
                    { nombre: 'Trabajo', color: 'rojo', publishedAt: new Date() },
                    { nombre: 'Personal', color: 'azul', publishedAt: new Date() },
                ],
            });
            strapi.log.info('Categorías iniciales creadas');
        }

        // 2️⃣ Crear tareas si no existen
        const countTareas = await strapi.db.query('api::tarea.tarea').count();
        if (countTareas === 0) {
            // Traer categoría "Trabajo" para relacionar
            const categoriaTrabajo = await strapi.db.query('api::categoria.categoria').findOne({
                where: { nombre: 'Trabajo' },
            });

            await strapi.db.query('api::tarea.tarea').createMany({
                data: [
                    {
                        titulo: 'Preparar informe',
                        descripcion: 'Informe mensual',
                        completada: false,
                        categoria: categoriaTrabajo?.id,
                        publishedAt: new Date(), // <-- Publicar inmediatamente
                    },
                    {
                        titulo: 'Comprar pan',
                        descripcion: 'Ir a la panadería',
                        completada: false,
                        publishedAt: new Date(), // <-- Publicar inmediatamente
                    },
                ],
            });
            strapi.log.info('Tareas iniciales creadas');
        }
    },
};