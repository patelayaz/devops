const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const Property = require(`./property`);

const agentsSchema = new Schema({
  agentCode: String,
  name: String,
  logo: String,
  address: String,
  phone: String,
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: `Property`,
    },
  ],
});

agentsSchema.pre(`findOneAndDelete`, async function (data) {
  console.log(`PRE agentsSchema`);
  console.log(data);
});

agentsSchema.post(`findOneAndDelete`, async function (deletedAgent) {
  console.log(`POST agentsSchema`);

  console.log("deletedAgent:");
  console.log(deletedAgent);

  if (deletedAgent.properties.length) {
    console.log(`Products need to be deleted`);
    const deletionResult = await Property.deleteMany({
      _id: { $in: deletedAgent.properties },
    });
    console.log(deletionResult);
  }
});

module.exports = mongoose.model(`Agent`, agentsSchema);
