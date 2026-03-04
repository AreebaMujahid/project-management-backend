import { Query,Resolver } from '@nestjs/graphql';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Resolver()
@UseInterceptors(ResponseInterceptor)
export class UserResolver {
    @Query()
    healthCheck() {
    return { data: [{ id: 1, name: 'John Doe' }], message: 'Users fetched' };
  }
}
