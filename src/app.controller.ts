import { Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
const fs = require('fs');
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/posts/')
  async getPosts() {
    return []
  }

  @Post('/posts/create/')
  async addPost(body: Body) {
    const bodyJson = body.json;
    console.log(`body: `, bodyJson);
    // get name and content from body
    const postName = bodyJson['name'];
    const postContent = bodyJson['post'];
    // get a random uuid to avoid name collison
    const postUUID = await randomUUID()
    // put together saveName
    const saveName = postName.toString() + postUUID.toString() + '.md';
    // save markdown content in new file
    // use given postName from body, plus uuid, append .md

    // todo: save post into mongo before adding to file system
    // because servers are not persistant
    
    // todo: on server reboot, look at mongo and re create posts in file system
    // shitty, but it'll work.

    try {
      fs.writeFile(saveName, postContent, (err) => {
        if (err) throw err;
        const saveDir = '!todo'
        console.log(`saved ${postName} as ${saveName} at: ${saveDir}`);
        return {
          status: true,
          msg: 'added post',
          postID: postUUID,
          postName: postName
        }
      })
    }
    catch(err) {
      console.log(`err saving post`);
      console.log(err);
      return {
        status: false,
        msg: 'err saving post',
        postID: postUUID,
        postName: postName
      }
    }
  }
}
