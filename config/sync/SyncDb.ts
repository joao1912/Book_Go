import { exec } from "child_process";

class SyncDb {

    static execute() {

        return new Promise((resolve, reject) => {

            exec('npx prisma db push', (error: any, stdout: any, stderr: any) => {

                if (error) {
                    console.error(`Erro ao sincronizar o banco de dados: ${error}`);
                    reject(error);
                    return;
                  }
                  if (stderr) {
                    console.error(`Erro ao sincronizar o banco de dados: ${stderr}`);
                    reject(stderr);
                    return;
                  }
                  console.log('Banco de dados sincronizado com sucesso!');
                  resolve(stdout);

            })

        })

    }

}

export default SyncDb