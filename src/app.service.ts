import { Injectable } from '@nestjs/common';
import { Command, Positional, Option } from 'nestjs-command';

@Injectable()
export class AppService {

  @Command({
    command: 'ng new teste --skip-install',
    describe: 'create a user',
    autoExit: true // defaults to `true`, but you can use `false` if you need more control
  })
  async build(): Promise<string> {
    return 'Hello World!';
  }
}
