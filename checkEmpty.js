
exports.check= function(s1) {
    return !s1.replace(/^\s+/g, '').length; // returns true if field is empty
}