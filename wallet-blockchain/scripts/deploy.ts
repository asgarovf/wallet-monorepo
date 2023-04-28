import { ethers } from "hardhat";

async function main() {
  const Webauthn = await ethers.getContractFactory("Webauthn");
  const webauthn = await Webauthn.deploy();

  await webauthn.deployed();

  const challenge = "0x94E9b636d0f3BDc08019B450F7f2F4Ef5b4eb2Ca";

  const signature =
    "0x000000000000000000000000000000000000000000000000000000000000012001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000180000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000240e9a568dde05e005851f4dc8b22f8465f83e635e2757f5c2f287cbd7a16640ddb2bac242d09b059177393cc4518a1348484d49ef86f69a00a2bf06d2017e7675ad2a9e021b0223e9ccf4fab031e620469e8dd846ec0ec16893a699c9afa353df745cadbd74d18596345638089cd3649ca0ac513070e657e97b3700c2f98c98ef000000000000000000000000000000000000000000000000000000000000002549960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000777b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a226c4f6d324e74447a7663434147625251395f4c303731744f73736f41222c226f726967696e223a22687474703a2f2f6c6f63616c686f73743a33303030222c2263726f73734f726967696e223a66616c73657d000000000000000000000000000000000000000000000000000000000000000000000000000000001c6c4f6d324e74447a7663434147625251395f4c303731744f73736f4100000000";

  const res = await webauthn.isValidSignature(challenge, signature);

  console.log(res);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});