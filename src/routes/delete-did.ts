
import { deleteDidDoc } from '@ayanworks/polygon-did-registrar';
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

export class DeleteDid {

    public routes(app): void {

        app.delete('/delete-did/:did/:privateKey', async (req, res) => {

            try {
                const did = req.params.did;
                const privateKey = req.params.privateKey;

                const deleteDidRes = await deleteDidDoc(did, privateKey)
                    .then((response) => {
                        return response;
                    });

                const gasPrice = deleteDidRes.data.gasPrice;
                const gasLimit = deleteDidRes.data.gasLimit;

                const gasPriceDecimal = parseInt(gasPrice._hex.substr(2), 16);
                const gasLimitDecimal = parseInt(gasLimit._hex.substr(2), 16);

                const txnFee = (gasPriceDecimal * gasLimitDecimal / Math.pow(10, 18))

                res.status(200).json({ success: deleteDidRes.success, data: { gasPrice, gasLimit, TX_Fee: txnFee }, message: deleteDidRes.message });
                logger.debug(
                    `deleteDidRes - ${JSON.stringify(deleteDidRes)} \n\n\n`
                );
            } catch (error) {
                logger.error(
                    `DeleteDid Error- ${JSON.stringify(error)} \n\n\n`
                );
                res.status(500).send(error);
            }
        })
    }
}
