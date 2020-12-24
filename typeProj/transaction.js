"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    async dispatch(scenario) {
        this.logs = [];
        this.store = {};
        for (let index in scenario) {
            let element = scenario[index];
            let logObj = {
                index: element.index,
                meta: element.meta,
                storeBefore: {},
                storeAfter: {},
                error: null
            };
            Object.assign(logObj.storeBefore, this.store);
            try {
                if (Number(index) + 1 !== element.index) {
                    throw new Error("Numeracia arasworia");
                }
                await element.call(this.store);
                Object.assign(logObj.storeAfter, this.store);
                this.logs[index] = logObj;
            }
            catch (err) {
                Object.assign(logObj.storeAfter, this.store);
                logObj.error = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                };
                delete logObj.storeBefore;
                delete logObj.storeAfter;
                this.logs[index] = logObj;
                for (let i = Number(index) - 1; i >= 0; --i) {
                    let element = scenario[i];
                    if (typeof element.restore === "undefined") {
                        continue;
                    }
                    await element.restore(this.store);
                }
                break;
            }
        }
    }
}
__decorate([
    gijiDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], Transaction.prototype, "dispatch", null);
exports.Transaction = Transaction;
function gijiDecorator(target, propertyName, descriptor) {
    let method = descriptor.value;
    descriptor.value = function () {
        let scenario = arguments[0];
        scenario = scenario.sort((item1, item2) => item1.index - item2.index);
        if (scenario[scenario.length - 1].hasOwnProperty('restore')) {
            throw new Error("Last Item must't have restore method");
        }
        console.log(this);
        //HELP: Aq return rato?
        return method.apply(this, arguments);
    };
}
