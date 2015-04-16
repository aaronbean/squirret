var e = module.exports;

e.prettyPrint = function (spaceCount) {
    return function (req, res, next) {
        var spaces = ((process.env.NODE_ENV == 'development' || !!req.query.pretty) ? spaceCount : 0);
        global.app.set('json spaces', spaces);
        delete req.query.pretty;
        return next(null);
    }
};
