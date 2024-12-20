/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, ObjectId, UpdateQuery } from "mongoose";

export class BaseRepository<T, U extends Document> {
  private readonly model: Model<U>;

  constructor(entity: Model<U>) {
    this.model = entity;
  }

  async find(filter: Partial<T>, populate: string[] = []): Promise<any> {
    let query = this.model.find(filter as any);

    if (populate.length > 0) {
      populate.forEach((field) => {
        query = query.populate(field);
      });
    }

    return await query.exec();
  }

  async findOne(
    filter: Record<string, unknown>,
    populate: string[] = []
  ): Promise<any | null> {
    let query = this.model.findOne(filter);

    if (populate.length > 0) {
      populate.forEach((field) => {
        query = query.populate(field);
      });
    }

    return await query.exec();
  }

  async findById(id: string, populate: string[] = []): Promise<any | null> {
    let query = this.model.findById(id);

    if (populate.length > 0) {
      populate.forEach((field) => {
        query = query.populate(field);
      });
    }

    return await query.exec();
  }

  async create(data: T, populate: string[] = []): Promise<any> {
    const result = await this.model.create(data);
    let query = this.model.findById(result._id);

    if (populate.length > 0) {
      populate.forEach((field) => {
        query.populate(field);
      });
    }

    return query.exec();
  }

  async update(
    id: ObjectId,
    data: Partial<T>,
    populate: string[] = []
  ): Promise<any> {
    const result = await this.model.findByIdAndUpdate(
      id,
      data as UpdateQuery<U>,
      { new: true }
    );

    if (!result) {
      let query = this.model.findById(id);

      if (populate.length > 0) {
        populate.forEach((field) => {
          query.populate(field);
        });
      }
      return query.exec();
    }
    return result;
  }

  async disable(id: ObjectId, populate: string[] = []): Promise<any> {
    const result = await this.model.findByIdAndUpdate(
      id,
      { ativo: false },
      { new: true }
    );

    if (!result) {
      let query = this.model.findById(id);

      if (populate.length > 0) {
        populate.forEach((field) => {
          query.populate(field);
        });
      }
      return query.exec();
    }
    return result;
  }

  async enable(id: ObjectId, populate: string[] = []): Promise<any> {
    const result = await this.model.findByIdAndUpdate(
      id,
      { ativo: true },
      { new: true }
    );

    if (!result) {
      let query = this.model.findById(id);

      if (populate.length > 0) {
        populate.forEach((field) => {
          query.populate(field);
        });
      }
      return query.exec();
    }
    return result;
  }

  async delete(id: ObjectId): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }
}
