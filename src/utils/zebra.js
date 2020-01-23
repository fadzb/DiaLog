// Using barcode converting logic from https://gist.github.com/sourcec0de/43a914d38931d6b174c0
// zebra.js
'use strict';

function EAN8(code) {
  if (code.length != 8) {
    throw 'EAN-8: Invalid code: ' + code;
  }

  this.code = code;
  this.type = module.exports.TYPE_EAN8;
}

function EAN13(code) {
  if (code.length != 13) {
    throw 'EAN-13: Invalid code: ' + code;
  }

  this.code = code;
  this.numberSystem = code[0] + code[1];
  this.manufacturerCode = code.substring(2, 7);
  this.productCode = code.substring(7, 12);
  this.checkDigit = code[12];
  this.type = module.exports.TYPE_EAN13;
}

EAN13.prototype.calcCheckDigit = function() {
  return calcUPCCheck(this.code);
};

EAN13.prototype.isCheckDigitValid = function() {
  return this.checkDigit == this.calcCheckDigit();
};

EAN13.prototype.isUPCA = function() {
  return this.code[0] == '0';
};

EAN13.prototype.toUPCA = function() {
  if (this.isUPCA()) {
    return new UPCA(this.code.substring(1));
  } else {
    throw 'EAN-13: Not a UPC-A: ' + this.code;
  }
};

function UPCA(code) {
  if (code.length != 12) {
    throw 'UPC-A: Invalid code: ' + code;
  }

  var typeMap = {
    0: 'REGULAR',
    1: 'RESERVED',
    2: 'VARIABLE_WEIGHT',
    3: 'DRUG_HEALTH',
    4: 'IN_STORE_NON_FOOD',
    5: 'COUPON',
    6: 'REGULAR',
    7: 'REGULAR',
    8: 'REGULAR',
    9: 'REGULAR',
  };

  this.code = code;
  this.numberSystem = code[0];
  this.manufacturerCode = code.substring(1, 6);
  this.productCode = code.substring(6, 11);
  this.checkDigit = code[11];
  this.productType = typeMap[this.numberSystem];
  this.type = module.exports.TYPE_UPCA;
}

UPCA.prototype.toEAN13 = function() {
  return new EAN13('0' + this.code);
};

UPCA.prototype.calcCheckDigit = function() {
  return calcUPCCheck(this.code);
};

UPCA.prototype.isCheckDigitValid = function() {
  return this.checkDigit == this.calcCheckDigit();
};

function UPCE(code) {
  if (code.length != 8 || code[0] != '0') {
    throw 'UPC-E: Invalid code: ' + code;
  }

  this.code = code;
  // UPC-E always starts with 0
  this.numberSystem = '0';
  /*
   * 1.) manufacturer code ends with 000, 100, or 200, the UPC-E code consists
   *     of the first two characters of the manufacturer code, the last three
   *     characters of the product code, followed by the third character of the
   *     manufacturer code. Under this case, The product code must be 00000 and
   *     00999.
   *
   * 2.) manufacturer code ends with 00 but does not meet the #1 requirement,
   *     the UPC-E code consists of the first three characters of the
   *     manufacturer code, the last two characters of the product code,
   *     followed by digit “3”. The product code can only contain two digits
   *     (00000 to 00099).
   *
   * 3.) manufacturer code ends in 0 but non of the above qualifies, the UPC-E
   *     consists of the first four digits manufacturer code and the last digit
   *     of the product code, followed by the digit “4”. The product code in
   *     this case can only contain one digit(00000 to 00009).
   *
   * 4.) manufacturer code ends with non-zero digit, the UPC-E code consists of
   *     the manufacturer code and the last digit of the product code. In this
   *     case the product case can only be one from 00005 to 00009 because 0 to
   *     4 has been used for the above four cases.
   */
  if (code[6] in ['0', '1', '2']) {
    this.manufacturerCode = code[1] + code[2] + code[6] + '00';
    this.productCode = '00' + code[3] + code[4] + code[5];
  } else if (code[6] == '3') {
    this.manufacturerCode = code[1] + code[2] + code[3] + '00';
    this.productCode = '000' + code[4] + code[5];
  } else if (code[6] == '4') {
    this.manufacturerCode = code[1] + code[2] + code[3] + code[4] + '0';
    this.productCode = '0000' + code[5];
  } else {
    this.manufacturerCode = code.substring(1, 6);
    this.productCode = '0000' + code[6];
  }
  this.checkDigit = code[7];
  this.productType = 'REGULAR';
  this.type = module.exports.TYPE_UPCE;
}

UPCE.prototype.toUPCA = function() {
  return new UPCA('0' + this.manufacturerCode + this.productCode + this.checkDigit);
};

UPCE.prototype.toEAN13 = function() {
  return this.toUPCA().toEAN13();
};

UPCE.prototype.calcCheckDigit = function() {
  return calcUPCCheck(this.code);
};

UPCE.prototype.isCheckDigitValid = function() {
  return this.checkDigit == this.calcCheckDigit();
};

function calcUPCCheck(code) {
  var checkDigit = 0;
  var odd = true;

  for (var i = 0; i < code.length; i++) {
    if (odd) {
      checkDigit += parseInt(code[i]) * 3;
    } else {
      checkDigit += parseInt(code[i]);
    }
    odd = !odd;
  }
  checkDigit = checkDigit % 10;
  checkDigit = 10 - checkDigit;
  checkDigit = checkDigit % 10;
  // same as new String()
  // does not product linting error
  return '' + checkDigit;
}

function parse(code) {
  if (!code) {
    throw 'most provide code';
  } else {
    if (code.length == 12) {
      return new UPCA(code);
    } else if (code.length == 8 && code[0] == '0') {
      return new UPCE(code);
    } else if (code.length == 13) {
      return new EAN13(code);
    } else if (code.length == 8 && code[0] != '0') {
      return new EAN8(code);
    } else {
      throw 'invalid code';
    }
  }
}

// for browser based JS
// if (module === void 0) {
//     module = {};
// }

module.exports = EAN8 = EAN8;
module.exports = EAN13 = EAN13;
module.exports = UPCA = UPCA;
module.exports = UPCE = UPCE;
module.exports = parse;
module.exports.TYPE_EAN13 = 'EAN-13';
module.exports.TYPE_EAN8 = 'EAN-8';
module.exports.TYPE_UPCA = 'UPC-A';
module.exports.TYPE_UPCE = 'UPC-E';
