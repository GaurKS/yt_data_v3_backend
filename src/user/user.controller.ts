import { 
  Controller, 
  Post,
  Get, Body
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserI } from './models/user.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService){}

  @Post()
  async add(
    @Body() user: UserI 
  ): Promise<Observable<UserI>>
  {
    return this.userService.add(user);
  }

  @Get()
  async findAll(): Promise<Observable<UserI[]>> {
    return this.userService.findAll();
  }

  @Get('ping')
  async ping(): Promise<String> {
    return "Hey, Server is up and running";
  }
}
