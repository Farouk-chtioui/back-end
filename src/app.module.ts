import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IndexModule } from './modules/index.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Agb'),
    IndexModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
