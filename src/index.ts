// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {

    /*
    await strapi.db.query('api::task.task').deleteMany({});
    await strapi.db.query('api::category.category').deleteMany({});
     */

    // Check if 'Front-end' category already exists
    const alreadySeeded = await strapi.db.query('api::category.category').findOne({
      where: {
        name: 'Front-end'
      }
    });

    if (!alreadySeeded) {

      try {

        /* 
          Categories
        
          Colours:
          * Red: #FF372F
          * Orange: #FF9300
          * Yellow: #FFFF00
          * Green: #6AEB49
          * Light-blue: #6AC7FF
          * Blue: #1581FF
          * Pink: #FF81FF
        */

        const categoryFront = await strapi.db.query('api::category.category').create({
          data: {
            name: 'Front-end',
            color: '#6AC7FF'
          }
        });

        const categoryBack = await strapi.db.query('api::category.category').create({
          data: {
            name: 'Back-end',
            color: '#FF9300'
          }
        });

        const categoryOther = await strapi.db.query('api::category.category').create({
          data: {
            name: 'Other',
            color: '#6AEB49'
          }
        });


        // Tasks

        await strapi.db.query('api::task.task').create({
          data: {
            title: 'Create Front end',
            description: 'Finish Front-end practice',
            completed: false,
            category: categoryFront.id
          }
        });

        await strapi.db.query('api::task.task').create({
          data: {
            title: 'Create Task',
            description: 'Create Task model',
            completed: false,
            category: categoryBack.id
          }
        });

        await strapi.db.query('api::task.task').create({
          data: {
            title: 'Create Category',
            description: 'Create Category model and link to Task model',
            completed: false,
            category: categoryBack.id
          }
        });

        await strapi.db.query('api::task.task').create({
          data: {
            title: 'Push practice',
            description: 'Push changes to the corresponding branch',
            completed: false,
            category: categoryOther.id
          }
        });

        console.log('\nDatabase seeded');
      } catch (error) {
        console.error('\nError seeding database: ', error);
      }
    } else {
      console.log('\nDatabase already seeded');
    }
  }
};
