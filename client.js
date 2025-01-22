const grpc = require('@grpc/grpc-js');  // שים לב שהשינוי כאן
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition);

function callDoubleNumber() {
  const client = new proto.MathService('localhost:50051', grpc.credentials.createInsecure());

  client.doubleNumber({ number: 5 }, (error, response) => {
    if (!error) {
      console.log('Response: ' + response.result);
    } else {
      console.error(error);
    }
  });
}

callDoubleNumber();
