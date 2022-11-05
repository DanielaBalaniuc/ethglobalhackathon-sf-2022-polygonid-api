import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
import * as log4js from "log4js";

const logger = log4js.getLogger();
logger.level = 'debug';

export class ResolveDid {
    public resolver: didResolvers.Resolver
    public constructor() {
        this.resolver = new didResolvers.Resolver(
            {
                ...didPolygon.getResolver(),
            },

            { cache: true }
        )
    }

    public routes(app): void {

        app.get('/resolve-did/:did', async (req, res) => {

            try {
                console.log("#########");
                console.log(req);
                const did = req.params.did;
                console.log(did);
                console.log(this.resolver);
                
                const returnDidDoc = await this.resolver.resolve(did)
                    .then((response) => {
                    return response;
                });

                let didDocRes = returnDidDoc.didDocument;

                res.status(200).send(didDocRes);
                logger.debug(
                    `returnDidDoc - ${JSON.stringify(returnDidDoc)} \n\n\n`
                );
            } catch (error) {
                logger.error(
                    `ResolveDid Error- ${JSON.stringify(error)} \n\n\n`
                );
                res.status(500).send(error);
            }
        })
    }
}