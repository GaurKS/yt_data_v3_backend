import { 
  Resolver, 
  Query, 
  Args 
} from '@nestjs/graphql'
import { VideoEntity } from './models/video.entity';
import { VideoService } from './video.service';
import { VideoDto } from './models/video.dto';

@Resolver((of) => VideoEntity)
export class VideoResolver {
  
  constructor (private readonly videoService: VideoService){}

  @Query(() => [VideoDto])
  async getVideos(
    @Args('offset') offset: number, 
    @Args('limit') limit: number
  ) {
    return this.videoService.getVideos(offset, limit)
  }

  @Query(() => [VideoDto])
  async search(
    @Args('searchTerm') searchTerm: string,
  ){
    return this.videoService.searchByTitle(searchTerm);
  }
}