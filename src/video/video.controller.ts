import { Controller } from '@nestjs/common';
import { VideoService } from './video.service';
import { Get, Param } from '@nestjs/common';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService){}

  @Get('fetchAll/ping')
  async ping() {
    return "Video Service is up and running...🚀";
  }

  @Get('fetchAll/test')
  async test() {
    return this.videoService.testFunc();
  }

  /**
   * GET: video/internal/videoFetch/:searchQuery
   * @param searchQuery 
   * @returns and stores list of all videos fetched from youtube data v3 api in db
   * Internal Service
   */
  @Get('internal/videoFetch/:searchQuery')
  async fetchVideos(
    @Param('searchQuery') searchQuery: string
  ){
    return await this.videoService.fetchVideos(searchQuery);
  }

}
