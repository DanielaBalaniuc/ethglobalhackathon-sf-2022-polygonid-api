
import { createDID } from '@ayanworks/polygon-did-registrar';
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

export class CreateDid {

    public routes(app): void {

        app.post('/create-did', async (req, res) => {
            try {

                const networkType = req.body.networkType;
                const privateKey = req.body.privateKey;

                const createDidRes = await createDID(networkType, privateKey)
                    .then((response) => {
                        return response;
                    });

                res.status(201).send(createDidRes);
                logger.debug(
                    `createDidRes - ${JSON.stringify(createDidRes)} \n\n\n`
                );
            } catch (error) {
                logger.error(
                    `CreateDid Error- ${JSON.stringify(error)} \n\n\n`
                );
                res.status(500).send(error);
            }
        })
    }
}
