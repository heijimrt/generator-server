import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import shell from 'shelljs';
const { exec } = require('child_process');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async generator(@Body() request): Promise<string> {
    await exec('ng new test --skip-install', (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
    
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    return this.appService.build();
  }
}
