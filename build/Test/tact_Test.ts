import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Add = {
    $$type: 'Add';
}

export function storeAdd(src: Add) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(973670713, 32);
    };
}

export function loadAdd(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 973670713) { throw Error('Invalid prefix'); }
    return { $$type: 'Add' as const };
}

function loadTupleAdd(source: TupleReader) {
    return { $$type: 'Add' as const };
}

function storeTupleAdd(source: Add) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserAdd(): DictionaryValue<Add> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAdd(src)).endCell());
        },
        parse: (src) => {
            return loadAdd(src.loadRef().beginParse());
        }
    }
}

export type BuyMiners = {
    $$type: 'BuyMiners';
}

export function storeBuyMiners(src: BuyMiners) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3269710549, 32);
    };
}

export function loadBuyMiners(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3269710549) { throw Error('Invalid prefix'); }
    return { $$type: 'BuyMiners' as const };
}

function loadTupleBuyMiners(source: TupleReader) {
    return { $$type: 'BuyMiners' as const };
}

function storeTupleBuyMiners(source: BuyMiners) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserBuyMiners(): DictionaryValue<BuyMiners> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBuyMiners(src)).endCell());
        },
        parse: (src) => {
            return loadBuyMiners(src.loadRef().beginParse());
        }
    }
}

export type SellEggs = {
    $$type: 'SellEggs';
}

export function storeSellEggs(src: SellEggs) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(979070491, 32);
    };
}

export function loadSellEggs(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 979070491) { throw Error('Invalid prefix'); }
    return { $$type: 'SellEggs' as const };
}

function loadTupleSellEggs(source: TupleReader) {
    return { $$type: 'SellEggs' as const };
}

function storeTupleSellEggs(source: SellEggs) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserSellEggs(): DictionaryValue<SellEggs> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSellEggs(src)).endCell());
        },
        parse: (src) => {
            return loadSellEggs(src.loadRef().beginParse());
        }
    }
}

export type User = {
    $$type: 'User';
    lastHatch: bigint;
    hatcheryMiners: bigint;
    claimedEggs: bigint;
}

export function storeUser(src: User) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.lastHatch, 32);
        b_0.storeUint(src.hatcheryMiners, 256);
        b_0.storeUint(src.claimedEggs, 256);
    };
}

export function loadUser(slice: Slice) {
    let sc_0 = slice;
    let _lastHatch = sc_0.loadUintBig(32);
    let _hatcheryMiners = sc_0.loadUintBig(256);
    let _claimedEggs = sc_0.loadUintBig(256);
    return { $$type: 'User' as const, lastHatch: _lastHatch, hatcheryMiners: _hatcheryMiners, claimedEggs: _claimedEggs };
}

function loadTupleUser(source: TupleReader) {
    let _lastHatch = source.readBigNumber();
    let _hatcheryMiners = source.readBigNumber();
    let _claimedEggs = source.readBigNumber();
    return { $$type: 'User' as const, lastHatch: _lastHatch, hatcheryMiners: _hatcheryMiners, claimedEggs: _claimedEggs };
}

function storeTupleUser(source: User) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.lastHatch);
    builder.writeNumber(source.hatcheryMiners);
    builder.writeNumber(source.claimedEggs);
    return builder.build();
}

function dictValueParserUser(): DictionaryValue<User> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUser(src)).endCell());
        },
        parse: (src) => {
            return loadUser(src.loadRef().beginParse());
        }
    }
}

 type Test_init_args = {
    $$type: 'Test_init_args';
    id: bigint;
}

function initTest_init_args(src: Test_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function Test_init(id: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTest_init_args({ $$type: 'Test_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Test_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3935: { message: `too little sent` },
}

const Test_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Add","header":973670713,"fields":[]},
    {"name":"BuyMiners","header":3269710549,"fields":[]},
    {"name":"SellEggs","header":979070491,"fields":[]},
    {"name":"User","header":null,"fields":[{"name":"lastHatch","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"hatcheryMiners","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"claimedEggs","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
]

const Test_getters: ABIGetter[] = [
    {"name":"calculateEggBuy","arguments":[{"name":"ton","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"contractbalance","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"calculateEggSell","arguments":[{"name":"eggs","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"calculateTrade","arguments":[{"name":"rt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rs","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bs","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getMyEggs","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getEggsSinceLastHatch","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"myUser","type":{"kind":"simple","type":"User","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balanceOff","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"User","optional":true}},
    {"name":"lastHatch","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"hatcheryMiners","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"claimedEggs","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"min","arguments":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"b","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"mybalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Test_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"BuyMiners"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Add"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SellEggs"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Test implements Contract {
    
    static async init(id: bigint) {
        return await Test_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await Test_init(id);
        const address = contractAddress(0, init);
        return new Test(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Test(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Test_types,
        getters: Test_getters,
        receivers: Test_receivers,
        errors: Test_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: BuyMiners | Add | SellEggs | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuyMiners') {
            body = beginCell().store(storeBuyMiners(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Add') {
            body = beginCell().store(storeAdd(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SellEggs') {
            body = beginCell().store(storeSellEggs(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCalculateEggBuy(provider: ContractProvider, ton: bigint, contractbalance: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(ton);
        builder.writeNumber(contractbalance);
        let source = (await provider.get('calculateEggBuy', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCalculateEggSell(provider: ContractProvider, eggs: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(eggs);
        let source = (await provider.get('calculateEggSell', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCalculateTrade(provider: ContractProvider, rt: bigint, rs: bigint, bs: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(rt);
        builder.writeNumber(rs);
        builder.writeNumber(bs);
        let source = (await provider.get('calculateTrade', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetMyEggs(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('getMyEggs', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetEggsSinceLastHatch(provider: ContractProvider, address: Address, myUser: User) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        builder.writeTuple(storeTupleUser(myUser));
        let source = (await provider.get('getEggsSinceLastHatch', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBalanceOff(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('balanceOff', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleUser(result_p) : null;
        return result;
    }
    
    async getLastHatch(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('lastHatch', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getHatcheryMiners(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('hatcheryMiners', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getClaimedEggs(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('claimedEggs', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMin(provider: ContractProvider, a: bigint, b: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        let source = (await provider.get('min', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMybalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('mybalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}