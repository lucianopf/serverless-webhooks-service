import { APIGatewayEvent } from 'aws-lambda';
import * as applicationService from '../services/applications'

async function create (event) {
  const { body: rawBody } = event
  const body = JSON.parse(rawBody)

  return applicationService.create(body)
}

async function show (event: APIGatewayEvent) {
  const { pathParameters } = event

  const { id } = pathParameters 

  return applicationService.show(id)
}

export {
  create,
  show,
}
