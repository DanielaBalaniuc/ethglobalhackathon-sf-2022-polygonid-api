import { updateDidDoc } from '@ayanworks/polygon-did-registrar';
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

export class UpdateDid {

    public routes(app): void {

        app.patch('/update-did/:did/:privateKey', async (req, res) => {

            try {
                const did = req.params.did;
                const privateKey = req.params.privateKey;
                const didDoc = JSON.stringify(req.body.didDoc);

                const updateDidRes = await updateDidDoc(did, didDoc, privateKey)
                    .then((response) => {
                        return response;
                    });

                const gasPrice = updateDidRes.data.gasPrice;
                const gasLimit = updateDidRes.data.gasLimit;

                const gasPriceDecimal = parseInt(gasPrice._hex.substr(2), 16);
                const gasLimitDecimal = parseInt(gasLimit._hex.substr(2), 16);

                const txnFee = (gasPriceDecimal * gasLimitDecimal / Math.pow(10, 18))

                res.status(200).json({ success: updateDidRes.success, data: { gasPrice, gasLimit, TX_Fee: txnFee }, message: updateDidRes.message });
                logger.debug(
                    `updateDidRes - ${JSON.stringify(updateDidRes)} \n\n\n`
                );
            } catch (error) {
                logger.error(
                    `UpdateDid Error- ${JSON.stringify(error)} \n\n\n`
                );
                res.status(500).send(error);
            }
        })
    }
}