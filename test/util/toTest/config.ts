import CleanDataBase from "../CleanDataBase";
import CloseServer from "../CloseServer";

export default async () => {
    
    await CleanDataBase.execute()
    await CloseServer.execute()

}