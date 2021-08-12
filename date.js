// Export an anonymous function request getDate
exports.getDate = function() { // node.js shortcut

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options);
}

// Export an anonymous function request getDay, 
exports.getDay = function() { // node.js shortcut

    const today = new Date();

    const options = {
        weekday: "long"
    };

    return today.toLocaleDateString("en-US", options);
}