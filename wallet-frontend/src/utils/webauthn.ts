import { webauthnABI } from "@/utils/abi";
import { webauthnAddress } from "@/utils/address";
import { client, server } from "@passwordless-id/webauthn";
import {
  AuthenticateOptions,
  AuthenticationEncoded,
  RegisterOptions,
  RegistrationEncoded,
  RegistrationParsed,
} from "@passwordless-id/webauthn/dist/esm/types";
import { parseBase64url } from "@passwordless-id/webauthn/dist/esm/utils";
import { Contract, ethers } from "ethers";

const DEFAULTS = {
  origin: "http://localhost:3000",
};

export const WebauthnOptions = {
  registerOptions: {
    authenticatorType: "auto",
    userVerification: "required",
    timeout: 60000,
    attestation: false,
    debug: false,
  } as RegisterOptions,
  authOptions: {
    authenticatorType: "auto",
    userVerification: "required",
    timeout: 60000,
  } as AuthenticateOptions,
  algorithm: "ES256",
};

export const register = async (
  challenge: string
): Promise<RegistrationEncoded> => {
  const registration = await client.register(
    "Ethylene",
    challenge,
    WebauthnOptions.registerOptions
  );

  return registration;
};

export const verifyRegistration = async (
  encodedRegistartionData: RegistrationEncoded,
  registrationChallenge: string
): Promise<RegistrationParsed> => {
  const verification = await server.verifyRegistration(
    encodedRegistartionData,
    {
      challenge: registrationChallenge,
      origin: DEFAULTS.origin,
    }
  );

  return verification;
};

export const authenticate = async (
  credentialId: string,
  challenge: string
): Promise<AuthenticationEncoded> => {
  const login = await client.authenticate(
    [credentialId],
    challenge,
    WebauthnOptions.authOptions
  );

  return login;
};

export const verifySignatureOnChain = async (
  _challenge: string,
  _webauthnPublicKey: string,
  _encodedChallenge: string,
  _signatureBase64: string,
  _authenticatorData: string,
  _clientData: string
) => {
  const signature = await getSignatureVerifyParamEncoded(
    _webauthnPublicKey,
    _encodedChallenge,
    _signatureBase64,
    _authenticatorData,
    _clientData
  );

  const contract = new Contract(
    webauthnAddress,
    webauthnABI,
    new ethers.providers.Web3Provider((window as any).ethereum)
  );

  console.log(signature);

  const res = await contract.isValidSignature(_challenge, signature);

  console.log(res);
};

export const getSignatureVerifyParamEncoded = async (
  _webauthnPublicKey: string,
  _encodedChallenge: string,
  _signatureBase64: string,
  _authenticatorData: string,
  _clientData: string
) => {
  const authenticatorData = bufferFromBase64(_authenticatorData);
  const authenticatorDataFlagMask = 0x01;
  const clientData = bufferFromBase64(_clientData);
  const clientChallenge = _encodedChallenge;
  const clientChallengeDataOffset = getClientChallengeOffset(_clientData);
  const rs = getRS(_signatureBase64);
  const coordinates = await getCoordinates(_webauthnPublicKey);

  const abiCoder = new ethers.utils.AbiCoder();
  const signature = abiCoder.encode(
    ["bytes", "bytes1", "bytes", "string", "uint", "uint[2]", "uint[2]"],
    [
      authenticatorData,
      authenticatorDataFlagMask,
      clientData,
      clientChallenge,
      clientChallengeDataOffset,
      rs,
      coordinates,
    ]
  );

  return signature;
};

export function bufferFromBase64(value: string): Buffer {
  return Buffer.from(value, "base64");
}
export function bufferToHex(buffer: ArrayBufferLike): string {
  return "0x".concat(
    [...new Uint8Array(buffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

function derToRS(der: Buffer): Buffer[] {
  var offset: number = 3;
  var dataOffset;

  if (der[offset] == 0x21) {
    dataOffset = offset + 2;
  } else {
    dataOffset = offset + 1;
  }
  const r = der.slice(dataOffset, dataOffset + 32);
  offset = offset + der[offset] + 1 + 1;
  if (der[offset] == 0x21) {
    dataOffset = offset + 2;
  } else {
    dataOffset = offset + 1;
  }
  const s = der.slice(dataOffset, dataOffset + 32);
  return [r, s];
}

export async function getSig(
  _challenge: string,
  _signatureBase64: string,
  _authenticatorData: string,
  _clientData: string
): Promise<ethers.BytesLike> {
  const signatureBuffer = bufferFromBase64(_signatureBase64);
  const signatureParsed = derToRS(signatureBuffer);

  const sig: ethers.BigNumber[] = [
    ethers.BigNumber.from(bufferToHex(signatureParsed[0])),
    ethers.BigNumber.from(bufferToHex(signatureParsed[1])),
  ];

  const authenticatorData = bufferFromBase64(_authenticatorData);
  const clientData = bufferFromBase64(_clientData);
  const challengeOffset =
    clientData.indexOf("226368616c6c656e6765223a", 0, "hex") + 12 + 1;

  const abiCoder = new ethers.utils.AbiCoder();
  const signature = abiCoder.encode(
    ["bytes", "bytes1", "bytes", "string", "uint", "uint[2]"],
    [authenticatorData, 0x01, clientData, _challenge, challengeOffset, sig]
  );
  return ethers.utils.arrayify(signature);
}

export async function getSignature(
  _challenge: string,
  _signatureBase64: string,
  _authenticatorData: string,
  _clientData: string
): Promise<ethers.BytesLike> {
  const signatureBuffer = bufferFromBase64(_signatureBase64);
  const signatureParsed = derToRS(signatureBuffer);

  const sig: ethers.BigNumber[] = [
    ethers.BigNumber.from(bufferToHex(signatureParsed[0])),
    ethers.BigNumber.from(bufferToHex(signatureParsed[1])),
  ];

  const authenticatorData = bufferFromBase64(_authenticatorData);
  const clientData = bufferFromBase64(_clientData);
  const challengeOffset =
    clientData.indexOf("226368616c6c656e6765223a", 0, "hex") + 12 + 1;

  const abiCoder = new ethers.utils.AbiCoder();
  const signature = abiCoder.encode(
    ["bytes", "bytes1", "bytes", "string", "uint", "uint[2]"],
    [authenticatorData, 0x01, clientData, _challenge, challengeOffset, sig]
  );
  return ethers.utils.arrayify(signature);
}

export function getRS(_signatureBase64: string): ethers.BigNumber[] {
  const signatureBuffer = bufferFromBase64(_signatureBase64);
  const signatureParsed = derToRS(signatureBuffer);

  const sig: ethers.BigNumber[] = [
    ethers.BigNumber.from(bufferToHex(signatureParsed[0])),
    ethers.BigNumber.from(bufferToHex(signatureParsed[1])),
  ];

  return sig;
}

async function getKey(pubkey: ArrayBufferLike) {
  const algoParams = {
    name: "ECDSA",
    namedCurve: "P-256",
    hash: "SHA-256",
  };
  return await crypto.subtle.importKey("spki", pubkey, algoParams, true, [
    "verify",
  ]);
}

export async function getCoordinates(
  pubkey: string | undefined
): Promise<ethers.BigNumber[]> {
  const pubKeyBuffer = bufferFromBase64(pubkey as string);
  const rawPubkey = await crypto.subtle.exportKey(
    "jwk",
    await getKey(pubKeyBuffer)
  );
  const { x, y } = rawPubkey;
  const pubkeyUintArray = [
    ethers.BigNumber.from(bufferToHex(bufferFromBase64(x as string))),
    ethers.BigNumber.from(bufferToHex(bufferFromBase64(y as string))),
  ];

  return pubkeyUintArray;
}

export async function getRawPublicKey(
  pubkey: string | undefined
): Promise<CryptoKey> {
  const pubKeyBuffer = bufferFromBase64(pubkey as string);

  const key = await getKey(pubKeyBuffer);

  return key;
}

export function getClientChallengeOffset(_clientData: string) {
  return (
    bufferFromBase64(_clientData).indexOf(
      "226368616c6c656e6765223a",
      0,
      "hex"
    ) +
    12 +
    1
  );
}

export const parseBase64AndArrayify = (value: string) => {
  return new Uint8Array(parseBase64url(value));
};
