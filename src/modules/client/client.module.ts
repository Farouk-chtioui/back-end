import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientService } from "./services/client.service";
import { ClientController } from "./controller/client.controller";
import { Client,ClientSchema } from "./schema/client.schema";



@Module({
    imports:[MongooseModule.forFeature([{name: Client.name, schema: ClientSchema}])],
    providers:[ClientService],
    controllers:[ClientController]
})
export class ClientModule {}
