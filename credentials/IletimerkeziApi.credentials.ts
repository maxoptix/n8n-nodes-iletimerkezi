import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class IletimerkeziApi implements ICredentialType {
    name = 'iletimerkeziApi';
    displayName = 'Iletimerkezi API';
    properties: INodeProperties[] = [
        { displayName: 'Username', name: 'username', type: 'string', default: '' },
        { displayName: 'Password', name: 'password', type: 'string', default: '' },
    ];
}
