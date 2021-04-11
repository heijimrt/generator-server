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

    const dir = './angular';
    // if (fs.existsSync(dir)){
      await del(dir);
      await fs.mkdirSync(dir);
      await process.chdir(dir);
    // }


    await exec('ng new test --skip-install', (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
      var zipFolder = require('zip-folder');
 
      zipFolder('./test', '../foo.zip', function(err) {
          if(err) {
              console.log('oh no!', err);
          } else {
              console.log('EXCELLENT');
              process.chdir('../');
          }
      });
      // var output = fs.createWriteStream('target.zip');
      // var archive = archiver('zip');
      
      // output.on('close', function () {
      //     console.log(archive.pointer() + ' total bytes');
      //     console.log('archiver has been finalized and the output file descriptor has closed.');
      // });
      
      // archive.on('error', function(err) {
      //     throw err;
      // });
      
      // archive.pipe(output);
      // // append files from a sub-directory, putting its contents at the root of archive
      // archive.directory('angular/test', true);

      // archive.finalize();

      
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    return this.appService.build();
  }
  
}
