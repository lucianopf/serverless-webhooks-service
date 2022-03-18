# serverless-webhooks-service

## description

The project aims to create a serverless webhooks service built with AWS Lambda, AWS DynamoDB, AWS Kinesis and AWS API Gateway.

Goals:
- scalable service
- pay-per-use
- 100% code coverage
- easy setup

## design

![diagram](./docs/diagram.png?v=2)

## docs
[WIP]

Planned routes:

- POST /applications
- GET /applications/:id
- POST /configurations
- GET /configurations
- GET /configurations/:id
- PATCH /configurations/:id
- POST /webhooks
- GET /webhooks
- GET /webhooks/:id
- POST /webhooks/:id/redeliver


### running locally

```
> npm i
> docker-compose up -d
> npm run dev 
```

### run tests

```
> npm i
> docker-compose up -d
> npm test:watch 
```

## changelog

- initial commit with design diagram 🎉
- add basic project structure
- add applications routes
- add Github Actions

## roadmap

- [x] create project design
- [x] create project structure
- [x] create basic project infrastructure
- [-] create setup config
- [ ] create new webhook
- [ ] create webhook sender
- [ ] create redeliver
- [ ] create webhook show