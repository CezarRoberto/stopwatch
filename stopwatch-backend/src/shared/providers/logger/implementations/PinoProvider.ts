import pino, { Logger } from 'pino';

import { envs } from '@shared/envs';

import { ILoggerDataDTO } from '../dtos/ILoggerDataDTO';
import { ILoggerProvider } from '../ILoggerProvider';

type IParseLoggerInputToPinoFormatParams<Payload, Type> = {
  message: string;
  loggerData?: ILoggerDataDTO<Payload, Type>;
};

export class PinoProvider implements ILoggerProvider {
  readonly pinoLogger: Logger;

  constructor(
    public readonly instance: Logger = pino({
      level: envs.LOGGER_LEVEL,
    }),
  ) {}

  private parseLoggerInputToPinoFormat<Payload, Type>({
    message,
    loggerData,
  }: IParseLoggerInputToPinoFormatParams<Payload, Type>) {
    return {
      msg: message,
      ...loggerData,
    };
  }

  info<Payload>(
    message: string,
    loggerData?: ILoggerDataDTO<Payload, 'info'>,
  ): void {
    this.instance.info(
      this.parseLoggerInputToPinoFormat<Payload, 'info'>({
        loggerData,
        message,
      }),
    );
  }

  warn<Payload>(
    message: string,
    loggerData?: ILoggerDataDTO<Payload, 'warn'>,
  ): void {
    this.instance.warn(
      this.parseLoggerInputToPinoFormat<Payload, 'warn'>({
        loggerData,
        message,
      }),
    );
  }

  error<Payload>(
    message: string,
    loggerData?: ILoggerDataDTO<Payload, 'error'>,
  ): void {
    this.instance.error(
      this.parseLoggerInputToPinoFormat<Payload, 'error'>({
        loggerData,
        message,
      }),
      message,
    );
  }

  debug<Payload>(
    message: string,
    loggerData?: ILoggerDataDTO<Payload, 'debug'>,
  ): void {
    this.instance.debug(
      this.parseLoggerInputToPinoFormat<Payload, 'debug'>({
        loggerData,
        message,
      }),
    );
  }
}

export const logger: ILoggerProvider = new PinoProvider();
