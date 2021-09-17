import { ClientOptions, Transport } from '@nestjs/microservices';

export enum KAFKA_TOPICS {
  USER_CREATED = 'user-created',
  USER_UPDATED = 'user-updated',
  USER_DELETED = 'user-deleted',
}

export const kafkaConfig: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'monolith',
      brokers: ['host.docker:9092'],
      retry: {
        initialRetryTime: 1000,
        retries: 8,
      },
    },
    consumer: {
      groupId: `consumer-${Math.random()}`,
    },
  },
};
