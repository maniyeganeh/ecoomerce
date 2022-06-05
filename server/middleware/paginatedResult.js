exports.paginatedResults = (model) => {

    return async (req, res, next) => {
        const page = parseInt(req.query.page || 1)
        const limit = parseInt(req.query.limit || 1)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        const total = await model.countDocuments().exec()
        if (endIndex < total) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find({}).sort({ _id: -1 }).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: "Something Went Wrong" })
        }
    };
};
exports.searchPagniated = (model) => {
    return async (req, res, next) => {
        const query = req.params.query;
        console.log(res);
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}
        const total = await model.find({ $title: { $search: query }, }).countDocuments().exec()

        if (endIndex < total) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }


        try {
            console.log(results);
            results.results = await model.find({ $title: { $search: query } }).sort({ _id: -1 }).limit(limit).skip(startIndex).populate("creator", "-password").exec()
            res.paginatedResults = {
                ...results,
                query: query,
                total: total,
                page: page,
                limit: limit,
                results: results.results,


            }
            next()
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something Went Wrong" })

        }
    }
}
