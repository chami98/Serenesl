const tf = require('@tensorflow/tfjs-node');

const model = tf.sequential();
model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [3] }));
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: 7, activation: 'softmax' }));


model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });


const inputs = itineraryData.map(data => {
  const feature = [];
  feature.push(data.morning ? 1 : 0);
  feature.push(data.afternoon ? 1 : 0);
  feature.push(data.evening ? 1 : 0);
  return feature;
});
const labels = tf.oneHot(tf.tensor1d(itineraryData.map((_, index) => index)), 7);


const epochs = 50;
const batchSize = 32;
await model.fit(tf.tensor2d(inputs), labels, { epochs, batchSize, shuffle: true });


await model.save('./models');
