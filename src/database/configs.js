const dynamoose = require('dynamoose')
const cuid = require('cuid')
const { DEFAULTS } = require('../configs')

const { Schema } = dynamoose

const { PROJECT_NAME } = process.env

const TABLE_NAME = 'Configs'

const {
  RETRIES_DELAY,
  RETRIES_MAX,
  RETRIES_STRATEGY,
} = DEFAULTS

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
    name: String,
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    events: {
      type: Array,
      schema: [String]
    },
    retries_max: {
      type: Number,
      default: RETRIES_MAX,
    },
    retries_delay: {
      type: Number,
      default: RETRIES_DELAY,
    },
    retries_strategy: {
      type: String,
      enum: [
        'linear',
        'exponential',
      ],
      default: RETRIES_STRATEGY,
    },
    failure_count: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        'active',
        'blocked',
        'disabled',
        'deleted',
      ],
      default: 'active',
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

const Config = dynamoose.model(`${PROJECT_NAME}.${TABLE_NAME}`, schema, modelOptions)

module.exports = Config
