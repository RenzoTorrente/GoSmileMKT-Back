'use strict';
const {user} = require('../../src/models/index');
const bcrypt = require('bcrypt');
const {rounds} = require('../../config/config');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      user.create({
        name:'Quentin',
        email:'quentinRD@Universal.com',
        password:bcrypt.hashSync('eraunavezH', +rounds),
        posts:[
        {
          title:'nuevo trabajo creativo',
          body:'este es un nuevo trabajo'
        },  {
          title:'nuevo trabajo creativo',
          body:'este es un nuevo trabajo 2'
        },  {
          title:'nuevo trabajo creativo',
          body:'este es un nuevo trabajo 3'
        },  {
          title:'nuevo trabajo creativo',
          body:'este es un nuevo trabajo 4'
        }
        ],
      }, {
        include:"posts"
      }),

      user.create({
        name:'Uma Thurman',
        email:'Uma@Universal.com',
        password:bcrypt.hashSync('eraunavezU', +rounds),
        posts:[
        {
          title:'nuevo Programador',
          body:'este es un nuevo trabajo 1'
        },
        {
          title:'nuevo Programador',
          body:'este es un nuevo trabajo 2'
        },
        {
          title:'nuevo Programador',
          body:'este es un nuevo trabajo 3'
        },
        {
          title:'nuevo Programador',
          body:'este es un nuevo trabajo 4'
        },
        ]
      }, {
        include:"posts"
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
   return Promise.all([
     queryInterface.bulkDelete('posts',null,{}),
     queryInterface.bulkDelete('users',null,{}),
   ])
  }
};
