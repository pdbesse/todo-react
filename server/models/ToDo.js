const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
    {
      todoText: {
        type: String,
        required: true,
      },
      todoAuthor: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(),
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: true,
    }
  );

const ToDo = model("ToDo", todoSchema);

module.exports = ToDo;
