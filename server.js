const grpc = require('@grpc/grpc-js');  
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition);

function doubleNumber(call, callback) {
  const number = call.request.number;
  callback(null, { result: number * 2 });
}

function startServer() {
  const server = new grpc.Server();
  server.addService(proto.MathService.service, { doubleNumber: doubleNumber });
  const port = '50051';
  server.bindAsync(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });
}

startServer();
