export const webauthnABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "_decodeSignature",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2]",
        name: "",
        type: "uint256[2]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "authenticatorData",
        type: "bytes",
      },
      {
        internalType: "bytes1",
        name: "authenticatorDataFlagMask",
        type: "bytes1",
      },
      {
        internalType: "bytes",
        name: "clientData",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "clientChallenge",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "clientChallengeDataOffset",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "rs",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2]",
        name: "coordinates",
        type: "uint256[2]",
      },
    ],
    name: "_verifySignature",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "x1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y1",
        type: "uint256",
      },
    ],
    name: "add",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "x2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y2",
        type: "uint256",
      },
    ],
    name: "addAndReturnProjectivePoint",
    outputs: [
      {
        internalType: "uint256[3]",
        name: "P",
        type: "uint256[3]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "z0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "x1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "z1",
        type: "uint256",
      },
    ],
    name: "addProj",
    outputs: [
      {
        internalType: "uint256",
        name: "x2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "z2",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "isOnCurve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "transaction",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y0",
        type: "uint256",
      },
    ],
    name: "isZeroCurve",
    outputs: [
      {
        internalType: "bool",
        name: "isZero",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "scalar",
        type: "uint256",
      },
    ],
    name: "multiplyScalar",
    outputs: [
      {
        internalType: "uint256",
        name: "x1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y1",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "z0",
        type: "uint256",
      },
    ],
    name: "toAffinePoint",
    outputs: [
      {
        internalType: "uint256",
        name: "x1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y1",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y0",
        type: "uint256",
      },
    ],
    name: "toProjectivePoint",
    outputs: [
      {
        internalType: "uint256[3]",
        name: "P",
        type: "uint256[3]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y0",
        type: "uint256",
      },
    ],
    name: "twice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "z0",
        type: "uint256",
      },
    ],
    name: "twiceProj",
    outputs: [
      {
        internalType: "uint256",
        name: "x1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "z1",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "message",
        type: "bytes32",
      },
      {
        internalType: "uint256[2]",
        name: "rs",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2]",
        name: "Q",
        type: "uint256[2]",
      },
    ],
    name: "validateSignature",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "zeroAffine",
    outputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "zeroProj",
    outputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
