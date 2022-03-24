const dynamoose = require('dynamoose')
const cuid = require('cuid')

const { Schema } = dynamoose

const { PROJECT_NAME } = process.env

const TABLE_NAME = 'Webhooks'

const schema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: cuid,
    },
    app_id: {
      type: String,
      required: true,
      index: {
        global: true,
      },
    },
    config_id: {
      type: String,
      required: true,
      index: {
        global: true,
      },
    },
    event_type: {
      type: String,
      required: true,
    },
    status_code: String,
    failure_reason: String,
    payload: String,
    signature: String,
    retries_count: {
      type: Number,
      default: 0,
    },
    retries_next_retry: Date,
    status: {
      type: String,
      enum: [
        'pending',
        'inflight',
        'success',
        'failure',
      ],
      default: 'pending',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const modelOptions = {
  create: true,
  update: true,
}

const Webhooks = dynamoose.model(`${PROJECT_NAME}.${TABLE_NAME}`, schema, modelOptions)

module.exports = Webhooks
