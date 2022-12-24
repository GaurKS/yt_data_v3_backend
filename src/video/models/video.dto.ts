import { InputType } from '@nestjs/graphql';
import {
  Field,
  ObjectType
} from 'type-graphql';

@ObjectType()
export class CreatePokemonDto {
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