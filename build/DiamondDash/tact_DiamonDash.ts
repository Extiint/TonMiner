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

export type BuyPickAxe = {
    $$type: 'BuyPickAxe';
    ref: bigint;
}

export function storeBuyPickAxe(src: BuyPickAxe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3958890759, 32);
        b_0.storeUint(src.ref, 32);
    };
}

export function loadBuyPickAxe(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3958890759) { throw Error('Invalid prefix'); }
    let _ref = sc_0.loadUintBig(32);
    return { $$type: 'BuyPickAxe' as const, ref: _ref };
}

function loadTupleBuyPickAxe(source: TupleReader) {
    let _ref = source.readBigNumber();
    return { $$type: 'BuyPickAxe' as const, ref: _ref };
}

function storeTupleBuyPickAxe(source: BuyPickAxe) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.ref);
    return builder.build();
}

function dictValueParserBuyPickAxe(): DictionaryValue<BuyPickAxe> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBuyPickAxe(src)).endCell());
        },
        parse: (src) => {
            return loadBuyPickAxe(src.loadRef().beginParse());
        }
    }
}

export type NewBuy = {
    $$type: 'NewBuy';
    amount: bigint;
    sender: Address;
}

export function storeNewBuy(src: NewBuy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1841952752, 32);
        b_0.storeUint(src.amount, 256);
        b_0.storeAddress(src.sender);
    };
}

export function loadNewBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1841952752) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(256);
    let _sender = sc_0.loadAddress();
    return { $$type: 'NewBuy' as const, amount: _amount, sender: _sender };
}

function loadTupleNewBuy(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    return { $$type: 'NewBuy' as const, amount: _amount, sender: _sender };
}

function storeTupleNewBuy(source: NewBuy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    return builder.build();
}

function dictValueParserNewBuy(): DictionaryValue<NewBuy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNewBuy(src)).endCell());
        },
        parse: (src) => {
            return loadNewBuy(src.loadRef().beginParse());
        }
    }
}

export type Reinvest = {
    $$type: 'Reinvest';
    code: bigint;
    amount: bigint;
}

export function storeReinvest(src: Reinvest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3889652129, 32);
        b_0.storeUint(src.code, 256);
        b_0.storeUint(src.amount, 256);
    };
}

export function loadReinvest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3889652129) { throw Error('Invalid prefix'); }
    let _code = sc_0.loadUintBig(256);
    let _amount = sc_0.loadUintBig(256);
    return { $$type: 'Reinvest' as const, code: _code, amount: _amount };
}

function loadTupleReinvest(source: TupleReader) {
    let _code = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'Reinvest' as const, code: _code, amount: _amount };
}

function storeTupleReinvest(source: Reinvest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.code);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserReinvest(): DictionaryValue<Reinvest> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReinvest(src)).endCell());
        },
        parse: (src) => {
            return loadReinvest(src.loadRef().beginParse());
        }
    }
}

export type User = {
    $$type: 'User';
    deposit: bigint;
    prom_code: bigint;
    lastCheck: bigint;
    upCheck: bigint;
    level: bigint;
    roi: bigint;
    penalty: bigint;
}

export function storeUser(src: User) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.deposit, 256);
        b_0.storeUint(src.prom_code, 32);
        b_0.storeUint(src.lastCheck, 32);
        b_0.storeUint(src.upCheck, 32);
        b_0.storeUint(src.level, 32);
        b_0.storeUint(src.roi, 32);
        b_0.storeUint(src.penalty, 32);
    };
}

export function loadUser(slice: Slice) {
    let sc_0 = slice;
    let _deposit = sc_0.loadUintBig(256);
    let _prom_code = sc_0.loadUintBig(32);
    let _lastCheck = sc_0.loadUintBig(32);
    let _upCheck = sc_0.loadUintBig(32);
    let _level = sc_0.loadUintBig(32);
    let _roi = sc_0.loadUintBig(32);
    let _penalty = sc_0.loadUintBig(32);
    return { $$type: 'User' as const, deposit: _deposit, prom_code: _prom_code, lastCheck: _lastCheck, upCheck: _upCheck, level: _level, roi: _roi, penalty: _penalty };
}

function loadTupleUser(source: TupleReader) {
    let _deposit = source.readBigNumber();
    let _prom_code = source.readBigNumber();
    let _lastCheck = source.readBigNumber();
    let _upCheck = source.readBigNumber();
    let _level = source.readBigNumber();
    let _roi = source.readBigNumber();
    let _penalty = source.readBigNumber();
    return { $$type: 'User' as const, deposit: _deposit, prom_code: _prom_code, lastCheck: _lastCheck, upCheck: _upCheck, level: _level, roi: _roi, penalty: _penalty };
}

function storeTupleUser(source: User) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.deposit);
    builder.writeNumber(source.prom_code);
    builder.writeNumber(source.lastCheck);
    builder.writeNumber(source.upCheck);
    builder.writeNumber(source.level);
    builder.writeNumber(source.roi);
    builder.writeNumber(source.penalty);
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

 type DiamonDash_init_args = {
    $$type: 'DiamonDash_init_args';
    id: bigint;
}

function initDiamonDash_init_args(src: DiamonDash_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function DiamonDash_init(id: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDiamonDash_init_args({ $$type: 'DiamonDash_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const DiamonDash_errors: { [key: number]: { message: string } } = {
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
    9760: { message: `24 hours needs to pass` },
    16798: { message: `cost is 1 ton` },
    41626: { message: `Not started yet` },
    46399: { message: `only owner can call this` },
}

const DiamonDash_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BuyPickAxe","header":3958890759,"fields":[{"name":"ref","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"NewBuy","header":1841952752,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Reinvest","header":3889652129,"fields":[{"name":"code","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"User","header":null,"fields":[{"name":"deposit","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"prom_code","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastCheck","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"upCheck","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"level","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"roi","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"penalty","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const DiamonDash_getters: ABIGetter[] = [
    {"name":"getRewards","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balanceOff","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"User","optional":true}},
    {"name":"promoRewards","arguments":[{"name":"code","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"lastCheck","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"mybalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const DiamonDash_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"BuyPickAxe"}},
    {"receiver":"internal","message":{"kind":"text","text":"Add"}},
    {"receiver":"internal","message":{"kind":"text","text":"GetBalance"}},
    {"receiver":"internal","message":{"kind":"text","text":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"text","text":"WithdrawPromo"}},
    {"receiver":"internal","message":{"kind":"text","text":"Upgrade"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Reinvest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class DiamonDash implements Contract {
    
    static async init(id: bigint) {
        return await DiamonDash_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await DiamonDash_init(id);
        const address = contractAddress(0, init);
        return new DiamonDash(address, init);
    }
    
    static fromAddress(address: Address) {
        return new DiamonDash(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  DiamonDash_types,
        getters: DiamonDash_getters,
        receivers: DiamonDash_receivers,
        errors: DiamonDash_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: BuyPickAxe | 'Add' | 'GetBalance' | 'Withdraw' | 'WithdrawPromo' | 'Upgrade' | Reinvest | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuyPickAxe') {
            body = beginCell().store(storeBuyPickAxe(message)).endCell();
        }
        if (message === 'Add') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'GetBalance') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'WithdrawPromo') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Upgrade') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Reinvest') {
            body = beginCell().store(storeReinvest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetRewards(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('getRewards', builder.build())).stack;
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
    
    async getPromoRewards(provider: ContractProvider, code: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(code);
        let source = (await provider.get('promoRewards', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getLastCheck(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('lastCheck', builder.build())).stack;
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