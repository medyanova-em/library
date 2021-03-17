/*
 * Copyright 2008 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import BarcodeFormat from '../BarcodeFormat';
import DecodeHintType from '../DecodeHintType';
import OneDReader from './OneDReader';
import EAN13Reader from './EAN13Reader';
import EAN8Reader from './EAN8Reader';
import NotFoundException from '../NotFoundException';
/**
 * <p>A reader that can read all available UPC/EAN formats. If a caller wants to try to
 * read all such formats, it is most efficient to use this implementation rather than invoke
 * individual readers.</p>
 *
 * @author Sean Owen
 */
var MultiFormatUPCEANReader = /** @class */ (function (_super) {
    __extends(MultiFormatUPCEANReader, _super);
    function MultiFormatUPCEANReader(hints) {
        var _this = _super.call(this) || this;
        var possibleFormats = hints == null ? null : hints.get(DecodeHintType.POSSIBLE_FORMATS);
        var readers = [];
        if (possibleFormats != null) {
            if (possibleFormats.indexOf(BarcodeFormat.EAN_13) > -1) {
                readers.push(new EAN13Reader());
            }
            if (possibleFormats.indexOf(BarcodeFormat.EAN_8) > -1) {
                readers.push(new EAN8Reader());
            }
            // todo add UPC_A, UPC_E
        }
        if (readers.length === 0) {
            readers.push(new EAN13Reader());
            readers.push(new EAN8Reader());
            // todo add UPC_A, UPC_E
        }
        _this.readers = readers;
        return _this;
    }
    MultiFormatUPCEANReader.prototype.decodeRow = function (rowNumber, row, hints) {
        var e_1, _a;
        try {
            for (var _b = __values(this.readers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var reader = _c.value;
                try {
                    return reader.decodeRow(rowNumber, row, hints);
                    // TODO ean13MayBeUPCA
                }
                catch (err) {
                    // continue;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        throw new NotFoundException();
    };
    MultiFormatUPCEANReader.prototype.reset = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.readers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var reader = _c.value;
                reader.reset();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return MultiFormatUPCEANReader;
}(OneDReader));
export default MultiFormatUPCEANReader;
//# sourceMappingURL=MultiFormatUPCEANReader.js.map