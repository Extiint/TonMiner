# TACT Compilation Report
Contract: Test
BOC Size: 1942 bytes

# Types
Total Types: 12

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Add
TLB: `add#3a090939  = Add`
Signature: `Add{}`

## BuyMiners
TLB: `buy_miners#c2e3d2d5  = BuyMiners`
Signature: `BuyMiners{}`

## SellEggs
TLB: `sell_eggs#3a5b6e1b  = SellEggs`
Signature: `SellEggs{}`

## User
TLB: `_ lastHatch:uint32 hatcheryMiners:uint256 claimedEggs:uint256 = User`
Signature: `User{lastHatch:uint32,hatcheryMiners:uint256,claimedEggs:uint256}`

# Get Methods
Total Get Methods: 12

## calculateEggBuy
Argument: ton
Argument: contractbalance

## calculateEggSell
Argument: eggs

## calculateTrade
Argument: rt
Argument: rs
Argument: bs

## getMyEggs
Argument: address

## getEggsSinceLastHatch
Argument: address
Argument: myUser

## balanceOff
Argument: address

## lastHatch
Argument: address

## hatcheryMiners
Argument: address

## claimedEggs
Argument: address

## min
Argument: a
Argument: b

## mybalance

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
3935: too little sent