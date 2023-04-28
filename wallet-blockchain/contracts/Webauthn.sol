// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// External Deps
import "@openzeppelin/contracts/access/Ownable.sol";

// Internal Deps
import "./utils/Errors.sol";
import "./EllipticCurve.sol";
import "./Base64.sol";
import "./Strings.sol";
import "./BytesLib.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Webauthn is Ownable, EllipticCurve {
    function isValidSignature(
        bytes calldata transaction,
        bytes memory _signature
    ) public view returns (bool) {
        (
            bytes memory authenticatorData,
            bytes1 authenticatorDataFlagMask,
            bytes memory clientData,
            string memory clientChallenge,
            uint clientChallengeDataOffset,
            uint[2] memory rs,
            uint[2] memory coordinates
        ) = this._decodeSignature(_signature);

        // return [
        //     abi.encodePacked(Base64.encode(transaction)),
        //     bytes(clientChallenge)
        // ];

        bytes memory encoded = bytes(Base64.encode(transaction));

        bytes memory formatted = new bytes(bytes(clientChallenge).length);
        copyBytes(encoded, 0, bytes(clientChallenge).length, formatted, 0);

        require(
            keccak256(formatted) == keccak256(bytes(clientChallenge)),
            Errors.INVALID_CHALLENGE
        );

        return
            this._verifySignature(
                authenticatorData,
                authenticatorDataFlagMask,
                clientData,
                clientChallenge,
                clientChallengeDataOffset,
                rs,
                coordinates
            );
    }

    function _verifySignature(
        bytes memory authenticatorData,
        bytes1 authenticatorDataFlagMask,
        bytes memory clientData,
        string memory clientChallenge,
        uint clientChallengeDataOffset,
        uint[2] memory rs,
        uint[2] memory coordinates
    ) public pure returns (bool) {
        if (
            (authenticatorData[32] & authenticatorDataFlagMask) !=
            authenticatorDataFlagMask
        ) {
            revert(Errors.INVALID_AUTHDATA);
        }

        bytes memory challengeExtracted = new bytes(
            bytes(clientChallenge).length
        );

        copyBytes(
            clientData,
            clientChallengeDataOffset,
            challengeExtracted.length,
            challengeExtracted,
            0
        );

        if (
            keccak256(abi.encodePacked(bytes(clientChallenge))) !=
            keccak256(abi.encodePacked(challengeExtracted))
        ) {
            revert(Errors.INVALID_CLIENTDATA);
        }

        bytes memory verifyData = new bytes(authenticatorData.length + 32);

        copyBytes(
            authenticatorData,
            0,
            authenticatorData.length,
            verifyData,
            0
        );

        copyBytes(
            abi.encodePacked(sha256(clientData)),
            0,
            32,
            verifyData,
            authenticatorData.length
        );

        bytes32 message = sha256(verifyData);

        require(
            validateSignature(message, rs, coordinates),
            Errors.INVALID_SIGNATURE
        );

        return true;
    }

    function copyBytes(
        bytes memory _from,
        uint _fromOffset,
        uint _length,
        bytes memory _to,
        uint _toOffset
    ) internal pure returns (bytes memory _copiedBytes) {
        uint minLength = _length + _toOffset;
        require(_to.length >= minLength); // Buffer too small. Should be a better way?
        uint i = 32 + _fromOffset; // NOTE: the offset 32 is added to skip the `size` field of both bytes variables
        uint j = 32 + _toOffset;
        while (i < (32 + _fromOffset + _length)) {
            assembly {
                let tmp := mload(add(_from, i))
                mstore(add(_to, j), tmp)
            }
            i += 32;
            j += 32;
        }
        return _to;
    }

    function _decodeSignature(
        bytes memory _signature
    )
        public
        pure
        returns (
            bytes memory,
            bytes1,
            bytes memory,
            string memory,
            uint,
            uint[2] memory,
            uint[2] memory
        )
    {
        (
            bytes memory authenticatorData,
            bytes1 authenticatorDataFlagMask,
            bytes memory clientData,
            string memory clientChallenge,
            uint clientChallengeDataOffset,
            uint[2] memory rs,
            uint[2] memory coordinates
        ) = abi.decode(
                _signature,
                (bytes, bytes1, bytes, string, uint, uint[2], uint[2])
            );

        return (
            authenticatorData,
            authenticatorDataFlagMask,
            clientData,
            clientChallenge,
            clientChallengeDataOffset,
            rs,
            coordinates
        );
    }
}
