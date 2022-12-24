import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoEntity } from './models/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { VideoResolver } from './video.resolver';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VideoEntity
    ]),
    // ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    })
  ],
  providers: [VideoService, VideoResolver],
  controllers: [VideoController],
})
export class VideoModule {}
