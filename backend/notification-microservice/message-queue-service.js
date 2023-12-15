//npm install amqplib

const amqp = require("amqplib"); // installs the amqplib package, a library that allows Node.js to interact with RabbitMQ.

const queueName = "notificationsQueue"; //Defining the name of the queue that will be used in RabbitMQ for storing messages (notifications in this case)
const connectionString = process.env.RABBITMQ_URL || "amqp://localhost"; // Connection string for RabbitMQ

//RABBITMQ_URL is set in your environment variables, it will use that; otherwise, it defaults to amqp://localhost.

async function connectToQueue() {
  // Connect to the message queue and create a channel
  try {
    const connection = await amqp.connect(connectionString); //Connects to RabbitMQ using the provided connection string
    const channel = await connection.createChannel(); //Creates a communication channel over the established connection.
    await channel.assertQueue(queueName, {
      //Ensures that the queue exists. If it doesn't, RabbitMQ will create it
      durable: false,
    });

    console.log("Connected to RabbitMQ and queue asserted"); //Logs a message indicating successful connection and queue setup
    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    process.exit(1); // Exit in case of connection failure
  }
}

// Function to subscribe to the queue
async function subscribeToQueue(callback) {
  //This function subscribes to the queue to listen for new messages.
  const channel = await connectToQueue();

  channel.consume(queueName, (message) => {
    //consume method is used to read messages from the queue. When a message is received, the callback function is triggered.
    if (message !== null) {
      console.log(
        "Received a message from the queue:",
        message.content.toString()
      );

      const notification = JSON.parse(message.content.toString()); //The message content is parsed from a Buffer to a string and then to a JSON object, which is then passed to the callback function
      callback(notification);

      channel.ack(message); // Acknowledges the message, indicating to RabbitMQ that it has been processed and can be removed from the queue.
    }
  });
}

// Function to publish a message to the queue
async function publishMessage(message) {
  const channel = await connectToQueue();

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  console.log("Published a message to the queue:", message);
}

module.exports = { connectToQueue, subscribeToQueue, publishMessage }; //Exports the functions so they can be used in other parts of the application
