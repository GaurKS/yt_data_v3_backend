import { 
  Resolver, 
  Query, 
  Mutation, 
  Args 
} from '@nestjs/graphql'
import { VideoEntity } from './models/video.entity';
import { VideoService } from './video.service';
import { VideoDto } from './models/video.dto';

@Resolver((of) => VideoEntity)
export class VideoResolver {
  
  constructor (private readonly videoService: VideoService){}

  @Query(() => [VideoDto])
  async getVideos() {
    return this.videoService.getVideos()
  }
}