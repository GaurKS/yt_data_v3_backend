import {
  Field,
  ObjectType,
  InputType,
  ArgsType
} from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { MinKey } from 'typeorm';

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

// @ArgsType()
// export class responseArgs {
//   @Field(()=> Int)
//   skip = 0

//   @Field(() => Int)
//   take = 25

// }