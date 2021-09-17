import { ClientOptions, Transport } from '@nestjs/microservices';

export enum KAFKA_TOPICS {
  USER_CREATED = 'user-created',
  USER_UPDATED = 'user-updated',
  USER_DELETED = 'user-deleted',
}

export interface KafkaMessage<ValueType> {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: ValueType;
  headers: Record<string, any>;
}

export const kafkaConfig: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'mailer',
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
