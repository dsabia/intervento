jQuery(document).ready(function($) {

    // Set the Options for "Bloodhound" suggestion engine
    var clientiEngine = new Bloodhound({
        remote: {
            url: '/lavoro/clienti/%QUERY%',
            wildcard: '%QUERY%'
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    var tecniciEngine = new Bloodhound({
        remote: {
            url: '/lavoro/tecnici/%QUERY%',
            wildcard: '%QUERY%'
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    $("#customer_th").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        source: clientiEngine.ttAdapter(),

        display: 'ragione_sociale',

        // This will be appended to "tt-dataset-" to form the class name of the suggestion menu.
        name: 'customer',

        // the key from the array we want to display (name,id,email,etc...)
        templates: {
            empty: [
                '<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
            ],
            header: [
                '<div class="list-group search-results-dropdown">'
            ],
            suggestion: Handlebars.compile('<div><strong>{{codice}}</strong> – {{ragione_sociale}}</div>')
        }
    });

    $("#technician_th").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        source: tecniciEngine.ttAdapter(),
        display: 'name',
        name: 'technician',
        templates: {
            empty: [
                '<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
            ],
            header: [
                '<div class="list-group search-results-dropdown">'
            ],
            suggestion: Handlebars.compile('<div><strong>{{account_code}}</strong> – {{name}}</div>')
        }
    });
});
