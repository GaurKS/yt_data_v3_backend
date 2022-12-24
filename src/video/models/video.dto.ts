import {
  Field,
  ObjectType,
  InputType
} from '@nestjs/graphql';

@ObjectType()
export class VideoDto {
    @Field() 
    readonly video_title: string

    @Field() 
    readonly query: string

    @Field() 
    readonly description?: string

    @Field()
    readonly publishedAt: string
    
    @Field()
    readonly thumbnail: string
}

@InputType()
export class inputVideo {
    @Field() 
    readonly video_title: string

    @Field() 
    readonly query: string

    @Field() 
    readonly description?: string

    @Field()
    readonly publishedAt: string
    
    @Field()
    readonly thumbnail: string
}