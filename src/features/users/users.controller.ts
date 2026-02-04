import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'features/auth/decorators/public.decorator';
import { Roles } from 'features/auth/decorators/roles.decorator';
import { RolesGuard } from 'features/auth/guards/roles.guard';
import { IdDto } from 'infrastructure/http/dto/id.dto';
import { RemoveDto } from 'infrastructure/http/dto/remove.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { UsersService } from './users.service';
import {
  ApiCreateUser,
  ApiDeleteUser,
  ApiGetAllUsers,
  ApiGetUser,
  ApiUpdateUser
} from './users.swagger';

/**
 * The `UsersController` is responsible for handling all incoming HTTP requests related to managing user entities.
 * This includes creating, retrieving, updating, and deleting users. The controller is protected by the `RolesGuard`
 * and is only accessible to users with the `ADMIN` role.
 */
@Controller({
  path: 'users',
  version: '1'
})
@Public()
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Handles the creation of a new user.
   *
   * **Decorators:**
   * - `@Post()`: Marks this as a POST request to create a new user.
   * - `@Body()`: Binds the incoming request body to the `CreateUserDto`.
   *
   * @param createUserDto - The DTO containing the new user's details.
   * @returns The newly created user entity.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateUser()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Fetches all users.
   *
   * **Decorators:**
   * - `@Get()`: Marks this as a GET request to retrieve all users.
   *
   * @returns An array of all user entities in the system.
   */
  @Get()
  @ApiGetAllUsers()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  /**
   * Fetches a single user based on the provided ID.
   *
   * **Decorators:**
   * - `@Get(':id')`: Marks this as a GET request to retrieve a user by their ID.
   * - `@Param()`: Extracts the ID parameter from the request URL.
   *
   * @param id - The unique identifier of the user to be retrieved.
   * @returns The found user entity, or an error if not found.
   */
  @Get(':id')
  @ApiGetUser()
  findOne(
    @Param()
    { id }: IdDto
  ) {
    return this.usersService.findOneById(id);
  }

  /**
   * Updates an existing user by ID.
   *
   * **Decorators:**
   * - `@Patch(':id')`: Marks this as a PATCH request to update the user by their ID.
   * - `@Param()`: Extracts the user ID from the request URL.
   * - `@Body()`: Binds the incoming request body to the `UpdateUserDto`.
   *
   * @param id - The ID of the user to be updated.
   * @param updateUserDto - The DTO containing the updated user details.
   * @returns The updated user entity or appropriate error messages.
   */
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUpdateUser()
  update(@Param() { id }: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Deletes a user by ID, either permanently or via soft delete.
   *
   * **Decorators:**
   * - `@Delete(':id')`: Marks this as a DELETE request to remove a user by their ID.
   * - `@Param()`: Extracts the user ID from the request URL.
   * - `@Query()`: Accepts a query parameter `soft` to specify if it's a soft delete.
   *
   * @param id - The ID of the user to be deleted.
   * @param soft - If true, performs a soft delete; otherwise, a hard delete.
   * @returns A message indicating success or failure.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteUser()
  remove(@Param() { id }: IdDto, @Query() { soft }: RemoveDto) {
    return this.usersService.remove(id, soft);
  }
}
