import HTTPAdapter from "../../src/adapters/HTTPAdapter/protocol";

class CloseServer {

    static async execute() {

        HTTPAdapter.close()

    }

}

export default async () => {

    await CloseServer.execute()

}
