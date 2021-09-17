# nestjs-microservices-example
### A basic example showing how microservices architecture works using nestjs and kafka

## Services description
#### Monilith: A sample blog api example
#### Mailer: Service for sending emails to contacts

## How to run the example (needs docker and docker-compose)
-  Enter in kafka folder and execute the docker-compose.yaml file 
   #### ```docker-compose up -d```
-  Run monolith and mailer services
-  Use the requests.http file to make HTTP requests in your VScode
-  Check if kafka is working acessing [localhost:19000]() (kafdrop)

### PS: In this example was used sqlite and prisma (ORM)

## Enjoy!!

