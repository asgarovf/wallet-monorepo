// SPDX-License-Identifier: No License (None)
pragma solidity ^0.8.17;

/**
 * @title Error messages library for NFT Marketplace
 */
library Errors {
    string constant INVALID_AUTHDATA = "Invalid authenticator data";
    string constant INVALID_CLIENTDATA = "Invalid client data";
    string constant INVALID_SIGNATURE = "Invalid signature";
    string constant INVALID_CHALLENGE = "Invalid challenge";
}
