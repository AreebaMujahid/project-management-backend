import { ExceptionFilter, Catch, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from './domain.error';
import type { ArgumentsHost } from '@nestjs/common';
import { SentryExceptionCaptured } from 'node_modules/@sentry/nestjs/build/types/decorators';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();

    // Universal Domain Error Handling
    if (exception instanceof DomainError) {
      return response.status(exception.httpStatus).json({
        statusCode: exception.httpStatus,
        timestamp,
        path: request.url,
        message: exception.message,
        errorCode: exception.code,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      return response.status(status).json({
        statusCode: status,
        timestamp,
        path: request.url,
        error: res,
      });
    }
    this.logger.error(`Unexpected error: ${exception}`);
    return response.status(500).json({
      statusCode: 500,
      timestamp,
      path: request.url,
      error: 'Internal server error',
    });
  }
}