// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

library Strings {
    function length(string memory _str) internal pure returns (uint256) {
        return bytes(_str).length;
    }

    function charAt(
        string memory _str,
        int256 _pos
    ) internal pure returns (string memory _char) {
        bytes memory _inArr = bytes(_str);
        uint256 _index;
        _index = _translateIndex(_pos, _inArr.length);
        bytes memory _outArr = new bytes(1);
        _outArr[0] = _inArr[_index];
        _char = string(_outArr);
    }

    function slice(
        string memory _str,
        int256 _start,
        int256 _end
    ) internal pure returns (string memory out) {
        bytes memory _inArr = bytes(_str);
        uint256 _inArrLen = _inArr.length;
        uint256 _startPos = _translateIndex(_start, _inArrLen);
        uint256 _endPos = _translateIndex(_end, _inArrLen);
        require(
            _startPos <= _endPos,
            "Start position must be less than end position"
        );
        bytes memory _outArr = new bytes(_endPos - _startPos);
        for (uint256 i = _startPos; i < _endPos; i++) {
            _outArr[i - _startPos] = _inArr[i];
        }
        out = string(_outArr);
    }

    function _translateIndex(
        int256 _index,
        uint256 _length
    ) private pure returns (uint256 _translated) {
        if (_index < 0) {
            _translated = uint256(int256(_length) + _index);
        } else {
            _translated = uint256(_index);
        }
        require(_translated < _length, "Position out of bounds");
    }

    function ltrim(string memory _in) internal pure returns (string memory) {
        bytes memory _inArr = bytes(_in);
        uint256 _inArrLen = _inArr.length;
        uint256 _start;
        // Find the index of the first non-whitespace character
        for (uint256 i = 0; i < _inArrLen; i++) {
            bytes1 _char = _inArr[i];
            if (
                _char != 0x20 && // space
                _char != 0x09 && // tab
                _char != 0x0a && // line feed
                _char != 0x0D && // carriage return
                _char != 0x0B && // vertical tab
                _char != 0x00 // null
            ) {
                _start = i;
                break;
            }
        }
        bytes memory _outArr = new bytes(_inArrLen - _start);
        for (uint256 i = _start; i < _inArrLen; i++) {
            _outArr[i - _start] = _inArr[i];
        }
        return string(_outArr);
    }

    function rtrim(string memory _in) internal pure returns (string memory) {
        bytes memory _inArr = bytes(_in);
        uint256 _inArrLen = _inArr.length;
        uint256 _end;
        // Find the index of the last non-whitespace character
        for (uint256 i = _inArrLen - 1; i >= 0; i--) {
            bytes1 _char = _inArr[i];
            if (
                _char != 0x20 && // space
                _char != 0x09 && // tab
                _char != 0x0a && // line feed
                _char != 0x0D && // carriage return
                _char != 0x0B && // vertical tab
                _char != 0x00 // null
            ) {
                _end = i;
                break;
            }
        }
        bytes memory _outArr = new bytes(_end + 1);
        for (uint256 i = 0; i <= _end; i++) {
            _outArr[i] = _inArr[i];
        }
        return string(_outArr);
    }

    function trim(string memory _in) internal pure returns (string memory) {
        return ltrim(rtrim(_in));
    }
}
