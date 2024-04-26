const tf = require('@tensorflow/tfjs-node');
const hospitalCategorization = require('../hospitalCategorization')


const categories = Object.keys(hospitalCategorization.hospitals);
const hospitalNames = categories.flatMap(category =>
    hospitalCategorization.hospitals[category].map(hospital => hospital.name)
);
const hospitalIndices = tf.oneHot(tf.tensor1d(hospitalNames.map(() => categories.indexOf(category))), categories.length);

const model = tf.sequential();
model.add(tf.layers.inputLayer({ inputShape: [hospitalNames.length] }));
model.add(tf.layers.embedding({ inputDim: categories.length, outputDim: 5, inputLength: hospitalNames.length }));
model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
model.add(tf.layers.dropout({ rate: 0.5 }));
model.add(tf.layers.dense({ units: categories.length, activation: 'softmax' }));


model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });


const epochs = 50;
const batchSize = 32;
await model.fit(hospitalIndices, hospitalIndices, { epochs, batchSize, shuffle: true });


await model.save('/models');

