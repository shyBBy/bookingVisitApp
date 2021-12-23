class ValidationError extends Error {}

const handleError = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                message: 'I cannot find an item with the given ID.',
            });
        return;
    }
  console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
            message: err instanceof ValidationError ? err.message : "Try again later, sorry!"
        })

};

module.exports = {
    handleError,
        ValidationError,
};