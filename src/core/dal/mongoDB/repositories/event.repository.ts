import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class EventRepository extends BaseRepository<EventDocument> {
  constructor(@InjectModel(Event.name) readonly eventModel: Model<EventDocument>) {
    super(eventModel);
  }

  public async create(createDocumentData: Omit<Event, '_id'>): Promise<EventDocument> {
    const user = await this.eventModel.create(createDocumentData);
    return user;
  }

  public async createMany(createDocumentData: Omit<Event, '_id'>[]): Promise<any> {
    const writeOps = createDocumentData.map((event) => {
      return {
        insertOne: {
          document: event,
        },
      };
    });

    return await this.eventModel.bulkWrite(writeOps);
  }
}
