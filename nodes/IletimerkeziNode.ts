import { INodeType, INodeTypeDescription, INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import axios from 'axios';

export class IletimerkeziNode implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Iletimerkezi SMS',
        name: 'iletimerkeziNode',
        icon: 'file:sms.svg',
        group: ['transform'],
        version: 1,
        description: 'Send SMS via Iletimerkezi API',
        defaults: { name: 'Iletimerkezi SMS' },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            { displayName: 'Phone Number', name: 'phoneNumber', type: 'string', default: '', required: true },
            { displayName: 'Message', name: 'message', type: 'string', default: '', required: true },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
            const message = this.getNodeParameter('message', i) as string;

            const url = `https://api.iletimerkezi.com/v1/send-sms/get/?username=${process.env.ILETIMERKEZI_USER}&password=${process.env.ILETIMERKEZI_PASS}&text=${encodeURIComponent(message)}&receipents=${phoneNumber}&sender=n8nBot`;

            const response = await axios.get(url);
            returnData.push({ json: response.data });
        }

        return [returnData];
    }
}
