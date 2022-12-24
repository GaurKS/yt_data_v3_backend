import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoEntity } from './models/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoEntity
    ]),
    ScheduleModule.forRoot(),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: 'schema.gql'
    // })
  ],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
