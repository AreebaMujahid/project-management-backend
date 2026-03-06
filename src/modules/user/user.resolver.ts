import { Query,Resolver } from '@nestjs/graphql';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Resolver()
@UseInterceptors(ResponseInterceptor)
export class UserResolver {
    @Query(() => String)
    healthCheck() {
    return 'User service is healthy';
  }
}
