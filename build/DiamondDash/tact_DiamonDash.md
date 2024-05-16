# TACT Compilation Report
Contract: DiamonDash
BOC Size: 2721 bytes

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

## BuyPickAxe
TLB: `buy_pick_axe#ebf7e107 ref:uint32 = BuyPickAxe`
Signature: `BuyPickAxe{ref:uint32}`

## NewBuy
TLB: `new_buy#6dc9f7f0 amount:uint256 sender:address = NewBuy`
Signature: `NewBuy{amount:uint256,sender:address}`

## Reinvest
TLB: `reinvest#e7d761a1 code:uint256 amount:uint256 = Reinvest`
Signature: `Reinvest{code:uint256,amount:uint256}`

## User
TLB: `_ deposit:uint256 prom_code:uint32 lastCheck:uint32 upCheck:uint32 level:uint32 roi:uint32 penalty:uint32 = User`
Signature: `User{deposit:uint256,prom_code:uint32,lastCheck:uint32,upCheck:uint32,level:uint32,roi:uint32,penalty:uint32}`

# Get Methods
Total Get Methods: 6

## getRewards
Argument: address

## balanceOff
Argument: address

## promoRewards
Argument: code

## lastCheck
Argument: address

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
9760: 24 hours needs to pass
16798: cost is 1 ton
41626: Not started yet
46399: only owner can call this