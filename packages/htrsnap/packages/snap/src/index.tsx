import { HathorWallet, Connection } from '@hathor/wallet-lib';
import { handleRpcRequest, TriggerTypes } from '@hathor/hathor-rpc-handler';
import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { Box, Text, Bold } from '@metamask/snaps-sdk/jsx';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */

const promptHandler = (origin: string) => async (request: any) => {
  // eslint-disable-next-line
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>
                Hello, <Bold>{origin}</Bold>!
              </Text>
              <Text>
                This custom confirmation is just for display purposes.
              </Text>
              <Text>
                But you can edit the snap source code to make it do something,
                if you want to!
              </Text>
            </Box>
          ),
        },
      });
    case TriggerTypes.CreateTokenConfirmationPrompt:
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>Hello</Text>
              <Text>
                This custom confirmation is just for display purposes.
              </Text>
              <Text>
                But you can edit the snap source code to make it do something,
                if you want to!
              </Text>
            </Box>
          ),
        },
      });
    case TriggerTypes.SignMessageWithAddressConfirmationPrompt:
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: (
            <Box>
              <Text>Hello</Text>
              <Text>
                This custom confirmation is just for display purposes.
              </Text>
              <Text>
                But you can edit the snap source code to make it do something,
                if you want to!
              </Text>
            </Box>
          ),
        },
      });
    default:
      throw new Error('Invalid request');
  }
};

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  const connection = new Connection({
    network: 'mainnet',
    servers: ['https://node1.mainnet.hathor.network/v1a/'],
    logger: console,
  });
  const xpub = 'xpub6D4UFe3D8jE73pJzDKY2QaucsgtGZUk3pyDwTFRPrzMfEu6tsumYC9vHsUZXacEZooxWK5z51VU25BLBLKpvM5QXz9rnZP6xa5VBt4bkmMs';
  const wallet = new HathorWallet({
    xpub,
    connection,
  });
  console.log('origin: ', origin);
  // @ts-ignore
  return handleRpcRequest(request, wallet, { teta: 'grande' }, promptHandler);
};
