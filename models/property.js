const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const Agent = require(`./agent`);

const propertiesSchema = new Schema({
  agentCode: String,
  title: String,
  image: String,
  type: String,
  rent: Number,
  area: String,
  city: String,
  postcode: String,
  bedrooms: Number,
  bathrooms: Number,
  latitude: Number,
  longitude: Number,
  features: [String],
  description: String,
  agentID: {
    type: Schema.Types.ObjectId,
    ref: `Agent`,
  },
});

propertiesSchema.pre(`findOneAndDelete`, async function (data) {
  console.log(`PRE propertiesSchema`);
  // console.log(data);
});

propertiesSchema.post(`findOneAndDelete`, async function (deletedProperty) {
  console.log(`POST propertiesSchema`);

  // console.log("deletedProperty:");
  // console.log(deletedProperty);

  // finding agent
  const agent = await Agent.findById(deletedProperty.agentID);
  // console.log("agent");
  // console.log(agent);

  // finding index of property in agent.properties[]
  const index = agent.properties.indexOf(deletedProperty._id);
  // deleting the property entry
  if (index > -1) {
    agent.properties.splice(index, 1);
  }
});

module.exports = mongoose.model(`Property`, propertiesSchema);
