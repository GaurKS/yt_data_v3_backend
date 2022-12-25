import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './models/video.entity';
import { Repository } from 'typeorm';
import Axios from 'axios';
import { VideoI } from './models/video.interface';
import { Cron } from '@nestjs/schedule/dist/decorators';
import { CronExpression } from '@nestjs/schedule/dist/enums';

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name)
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,

  ) {}

  async testFunc() {
    let lastPublishedAt;
    try{
      lastPublishedAt = await this.videoRepository
                                              .createQueryBuilder('video')
                                              .select('video.publishedAt')
                                              .orderBy({
                                                "video.publishedAt": "DESC"
                                              })
                                              .getOne();
      console.log("last published at: ", lastPublishedAt.publishedAt);
      return lastPublishedAt.publishedAt;
    } catch (err) {
      console.log("Error: ", err);
      return {
        statusCode: 400,
        error: err
      };
    }
  }

  async fetchVideos(searchQuery: string) {
    // getApiKey
    let lastPublishedAt = await this.testFunc();
    let timeObj = new Date(lastPublishedAt);
    let newTime = new Date(timeObj.getTime() + (0.5)*60000); // add 30 sec to the last published at time
    lastPublishedAt = newTime.toISOString();
    console.log("lastTime produced: ", lastPublishedAt);

    const response = await Axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          key: 'AIzaSyA2qczuK9rk22XO51UcZYa78LiWt-y6hWk',
          q: searchQuery,
          part: 'snippet',
          type: 'video',
          order: 'date',
          maxResults: 10,
          publishedAfter: '2022-09-23T01:59:53Z' 
        }
      }
    );

    const data: Array<VideoI> = [];
    response.data.items.forEach(async (element)=> {
      try {
        const obj = {
          query: searchQuery,
          video_title: element.snippet.title,
          description: element.snippet.description,
          publishedAt: element.snippet.publishedAt,
          thumbnail: element.snippet.thumbnails.default.url,
        }
        data.push(obj); 
        const newVideo = this.videoRepository.create({
          query: searchQuery,
          video_title: element.snippet.title,
          description: element.snippet.description,
          publishedAt: element.snippet.publishedAt,
          thumbnail: element.snippet.thumbnails.default.url
        })
        await newVideo.save();
        return {
          statusCode: 201,
          message: "Added Successfully",
          data: data
        };

      } catch (error) {
        console.log("Error while adding video to db: ", error);
        return {
          statusCode: 401,
          message: "Error Occurred",
          data: error
        };
      }
    });

  }


  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron(){
    try {
      this.logger.debug('CronService: Fetching new videos...');
      await this.fetchVideos('sea');
      this.logger.debug('CronService: Videos Fetched Successfully');
    } catch (error) {
      console.log("Error from CronService: ", error);
    }
  }

  async getVideos(offset: number, limit: number): Promise<Array<VideoEntity>> {
    return await this.videoRepository.find({
      order: {
        publishedAt: "DESC"
      },
      take: offset,
      skip: limit
    })

  }

  async searchByTitle(searchTerm: string){
    const data = await this.videoRepository
                                .createQueryBuilder('video')
                                .where('video.video_title ILIKE :searchTerm', {
                                  searchTerm: `%${searchTerm}%`
                                })
                                .orderBy({
                                  "video.publishedAt": "DESC"
                                })
                                .getMany();
    return data;
  }
}
