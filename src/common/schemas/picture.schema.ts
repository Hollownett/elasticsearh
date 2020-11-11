import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, model } from 'mongoose'

@Schema()
export class Picture extends Document {
   @Prop()
   name: string

   @Prop()
   author: string

   @Prop()
   price: string
}

const PictureSchema = SchemaFactory.createForClass(Picture)

PictureSchema.set('toObject', { virtuals: true })
PictureSchema.set('toJSON', { virtuals: true })

const PictureModel = model(Picture.name, PictureSchema)

export {PictureSchema, PictureModel}