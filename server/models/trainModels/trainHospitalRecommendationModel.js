const tf = require('@tensorflow/tfjs-node');


const model = tf.sequential();
model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [3] }));
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: 4, activation: 'softmax' }));


model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

const inputs = Object.values(touristDestinations.destinations).flatMap(destinations =>
    destinations.map(destination => {
        const feature = [];
        feature.push(destination.description ? 1 : 0);
        feature.push(destination.imageUrl ? 1 : 0);
        feature.push(destination.mapsUrl ? 1 : 0);
        return feature;
    })
);
const labels = tf.oneHot(tf.tensor1d(inputs.map((_, index) => index)), 4);


const epochs = 50;
const batchSize = 32;
await model.fit(tf.tensor2d(inputs), labels, { epochs, batchSize, shuffle: true });

await model.save('./models');
