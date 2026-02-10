import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { IDevice } from 'features/sessions/interfaces/device.interface';
import { CustomAuth } from 'infrastructure/http/interfaces/custom-request.interface';
import { ChangePasswordDto } from '../users/dto/change-password.dto';
import { AuthService } from './auth.service';
import { IpAddress } from './decorators/ipAddress.decorator';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import { UserAgent } from './decorators/userAgent.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthCookieInterceptor } from './interceptors/auth-cookie.interceptor';

@Controller({ path: 'auth', version: '1' })
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegisterUserDto
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data'
  })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error occurred'
  })
  signUpUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AuthCookieInterceptor)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    type: LoginResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials'
  })
  async signInUser(
    @Body() loginUserDto: LoginUserDto,
    @IpAddress() ip: string,
    @UserAgent() device: IDevice
  ) {
    return await this.authService.loginUser(loginUserDto, ip, device);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('change-password')
  @ApiOperation({
    summary: 'Change user password',
    description:
      'This endpoint allows the user to change their password. The current password must be provided for validation.'
  })
  @ApiResponse({
    status: 204,
    description: 'Password changed successfully'
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data, including an incorrect current password or other validation errors'
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized: User must be authenticated to change the password'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  changePassword(
    @User() authData: CustomAuth,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.authService.changeUserPassword(authData, changePasswordDto);
  }
}
