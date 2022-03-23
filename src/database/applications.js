const dynamoose = require('dynamoose')
const cuid = require('cuid')

const { Schema } = dynamoose

const { PROJECT_NAME } = process.env

const TABLE_NAME = 'Applications'

const schema = new Schema(
  {
    app_id: {
      type: String,
      hashKey: true,
    },
    name: String,
    status: {
      type: String,
      enum: [
        'active',
        'blocked',
        'disabled',
      ],
      default: 'active',
    },
    secret: String,
    api_key: {
      type: String,
      default: cuid,
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

const Application = dynamoose.model(`${PROJECT_NAME}.${TABLE_NAME}`, schema, modelOptions)

module.exports = Application
