// src/modules/auth/services/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { Admin } from '../../admin/schema/admin.schema';
import { Market } from '../../market/schema/market.schema';
import { Driver } from '../../driver/schema/driver.schema';
//import { User } from '../../client/schema/user.schema';
import { Roles } from '../../../enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Market.name) private marketModel: Model<Market>,
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
   // @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string, role: Roles }> {
    const { email, password } = loginDto;

    const userChecks: { model: Model<any>, role: Roles }[] = [
      { model: this.adminModel, role: Roles.Admin },
      { model: this.marketModel, role: Roles.Market },
      { model: this.driverModel, role: Roles.Driver },
     // { model: this.userModel, role: Roles.User },
    ];

    for (const { model, role } of userChecks) {
        const user = await model.findOne({ email }).exec();
        if (user && await bcrypt.compare(password, user.password)) {
          const payload = { username: user.name, sub: user._id, role };
          const token = this.jwtService.sign(payload, {
            expiresIn: loginDto.rememberMe ? '30d' : '1h',
          });
          return { token, role };
        }
      }
  
      throw new UnauthorizedException('Invalid email or password');
    }
  }
