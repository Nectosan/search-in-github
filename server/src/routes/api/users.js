import { Router } from "express";
import {PrismaClient} from '@prisma/client'
require('isomorphic-fetch');

const api = Router();
const prisma = new PrismaClient();
const token = process.env.TOKEN

async function insertDB(gitUser) {
  await prisma.user.create({
    data: {
      idUser : gitUser.id,
      login: gitUser.login,
      followers : gitUser.followers,
      following : gitUser.following,
      node_id  :  gitUser.node_id,       
      avatar_url :  gitUser.avatar_url,
      gravatar_id :  gitUser.gravatar_id,
      url  :  gitUser.url,
      html_url     :  gitUser.html_url,
      gists_url  :  gitUser.gists_url,
      starred_url  :  gitUser.starred_url,
      subscriptions_url  :  gitUser.subscriptions_url,
      organizations_url  :  gitUser.organizations_url,
      repos_url    :  gitUser.repos_url,
      events_url  :  gitUser.events_url,
      received_events_url:  gitUser.received_events_url,
      type     :  gitUser.type,
      site_admin  :  gitUser.site_admin,
      name       :  gitUser.name,
      company   :  gitUser.company,
      blog      :  gitUser.blog,
      location    :  gitUser.location,
      email       :  gitUser.email,
      bio        :  gitUser.bio,
      twitter_username :  gitUser.twitter_username,
      public_repos   :  gitUser.public_repos,
      public_gists   :  gitUser.public_gists,
      followers_url      :  gitUser.followers_url,
      following_url   :  gitUser.following_url,
      created_at    :  gitUser.created_at,
      updated_at   :  gitUser.updated_at,
    },
  })
}

async function isPresent(loginUser){
  
  const user = await prisma.user.findUnique({
    where: {
      login: loginUser,
    },
  })

  return user
}

api.get("/:username",async (request, response) => {

  const { username } = request.params;
  
  
    const requete = require('request');

    var options = {
      uri: `https://api.github.com/users/${username}`,
      method: 'GET',
      headers: {'user-agent': 'node.js', 'Authorization':`Bearer `+token}
    };
    
    let result = await isPresent(username)

    if(result == null){
    
      requete(options,async function (error,requete,body){
        body = JSON.parse(body)
        if(!error && requete.statusCode == 200){
            response.json({
              data: { body },
            });
            //console.log(body)
            insertDB(body)

            console.log("1er enregistrement !")


        }else{
          response.json({
            data: {} ,
          });
          
        }
      })

    }

    else{
      let body = result
      console.log("Utilisateur déjà enregistré on reprend depuis la BDD !")
      response.json({
        data: {body} ,
      });
    }


});

export default api;
