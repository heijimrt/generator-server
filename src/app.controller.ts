import { Body, Controller, Get, Header, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import shell from 'shelljs';
const { exec } = require('child_process');
var fs = require('fs');
const del = require('del');
var archiver = require('archiver');
import { Response } from 'express';
import { Readable } from 'stream';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @Header('Content-type', 'application/zip')
  async generator(
    @Body() request,
    @Res() res: Response,
  ){
    const dir = '/home/heijimrt/Desktop/generator/invest';
    await del(`${dir}/generated`, { force: true });
    await process.chdir(dir);
    const pages = [];
    const type = request.mode;

    for (let feature of request.features) {
      const page = {
        name: feature.name,
        artifacts: feature.artifacts,
      };
      pages.push(page);
    }
    const command = `schematics .:invest --dry-run=false --type='${type}' --pages='${JSON.stringify(pages)}'`;

    await exec(command,
      (err, stdout, stderr) => {
        if (err) {
          return;
        }
        var zipFolder = require('zip-folder');
  
        zipFolder(`${dir}/generated`, '../foo.zip', function(err) {
            if(err) {
                console.log('oh no!', err);
            } else {
                console.log('EXCELLENT');
            }
        });
        
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });

      const pdf = await new Promise<Buffer>((resolve, reject) => {
        fs.readFile('../foo.zip', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      const stream = new Readable();
      stream.push(pdf);
      stream.push(null);
      stream.pipe(res);
  }
  
}
