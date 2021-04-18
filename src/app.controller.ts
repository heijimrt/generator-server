import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import shell from 'shelljs';
const { exec } = require('child_process');
var fs = require('fs');
const del = require('del');
var archiver = require('archiver');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async generator(@Body() request): Promise<string> {
    console.log(request);
    /**
     * comentado momentaneamente
     */
    // const dir = './angular';
    // await del(dir);
    // await fs.mkdirSync(dir);
    // await process.chdir(dir);

    // await exec('ng new test --skip-install', (err, stdout, stderr) => {
    //   if (err) {
    //     // node couldn't execute the command
    //     return;
    //   }
    //   var zipFolder = require('zip-folder');
 
    //   zipFolder('./test', '../foo.zip', function(err) {
    //       if(err) {
    //           console.log('oh no!', err);
    //       } else {
    //           console.log('EXCELLENT');
    //           process.chdir('../');
    //       }
    //   });
      
    //   console.log(`stdout: ${stdout}`);
    //   console.log(`stderr: ${stderr}`);
    // });
    return request;
  }
  
}
