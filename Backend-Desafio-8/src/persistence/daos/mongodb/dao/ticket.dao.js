import MongoDao from "./mongo.dao";
import { TicketModel } from "../models/ticket.model";

export class DaoMDBTicket extends MongoDao {
  constructor() {
    super(TicketModel);
  }

  async createTicket(ticket) {
    try {
      const newTicket = await TicketModel.create({
        ...ticket,
        created_at: new Date(),
      });
      return newTicket;
    } catch (err) {
      console.log(err);
    }
  }
}
