exports.ErrorPage = (req, res, next) => {
    res.status(404);
    res.render('404', {pageTitle: 'Page Not Found'})
}