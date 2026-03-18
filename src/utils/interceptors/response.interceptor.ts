import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GqlContextType } from '@nestjs/graphql';

export interface ApiResponse<T> {
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<ApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiResponse<T>>,
  ): Observable<any> {
    if (context.getType<GqlContextType>() === 'graphql') {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          message: data?.message ?? 'Request successful',
          meta: data?.meta,
          data: data?.data ?? (data as T),
        };
      }),
    );
  }
}