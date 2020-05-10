import Handlebars from 'handlebars';
import moment from 'moment';

Handlebars.registerHelper('trim', function (string) {
    const newString = string.substring(0, 7);
    return new Handlebars.SafeString(newString);
});

Handlebars.registerHelper('formatDate', function (date, format) {
    const momentDate = moment(date);
    return momentDate.format(format);
});

Handlebars.getTemplate = function (name) {
    if (
        Handlebars.templates === undefined ||
        Handlebars.templates[name] === undefined
    ) {
        $.ajax({
            url: 'templates/' + name + '.handlebars',
            success: function (data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async: false,
        });
    }
    return Handlebars.templates[name];
};
