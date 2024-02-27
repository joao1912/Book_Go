import HTTPAdapter from "../../src/adapters/HTTPAdapter/protocol";

export default class CloseServer {

    static async execute() {

        HTTPAdapter.close()

    }

}
