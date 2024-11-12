## Publish

Deploy Build

```bash
source .env && rm -rf cache out && forge build && forge script --chain 41923 script/DeployCreditTopUp.s.sol:DeployCreditTopUp --rpc-url https://rpc.edu-chain.raas.gelato.cloud --broadcast --verify --verifier blockscout  --verifier-url "https://educhain.blockscout.com/api/" -vvvv --private-key ${PRIVATE_KEY}
```
