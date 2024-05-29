import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 8009)

app.listen(app.get('port'), function () {
 console.log(`Application started on http://localhost:${app.get('port')}`)
})

const apiUrl = 'https://fdnd-agency.directus.app/items',
    sdgData = await fetchJson(apiUrl + '/hf_sdgs'), 
    stakeholdersData = await fetchJson(apiUrl + '/hf_stakeholders'),
    scoresData = await fetchJson(apiUrl + '/hf_scores'),
    companiesData = await fetchJson(apiUrl + '/hf_companies')

console.log(companiesData.data)

// ROUTES -----------------------------------------------------------
app.get('/', function (request, response) {
    response.render('index', {
        company: companiesData.data,
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
    })
})

app.get('/dashboard/:company_id', function (request, response) { 
    var companyId = request.params.company_id;
    var company = companiesData.data.find(company => company.id == companyId);
    if (!company) {
        response.status(404).send('Company not found');
        return;
    }
    response.render('dashboard', {
        company: company,
        stakeholder: stakeholdersData.data,
        sdgs: sdgData.data,
        score: scoresData.data,
    });
    console.log(companyId);
});

// VRAGENLIJST -----------------------------------------------------
app.get('/gegevens-form/:stakeholder_type', function (request, response) {
    var stakeholderType = request.params.stakeholder_type 
    response.render('gegevens-form', {
        stakeholder: stakeholdersData.data,
        company: companiesData.data,
    })
})


app.get('/sdg', function (request, response) { 
    response.render('sdg', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })

})

app.post('/score-form', function (request, response) {
    const selectedSdgs = request.body['sdg-selection']; // Array of selected SDG IDs

    // Check if any SDGs were selected
    if (!selectedSdgs) {
        return response.redirect('/sdg'); // Redirect back if none selected
    }

    // If a single SDG is selected, convert it to an array
    const selectedSdgsArray = Array.isArray(selectedSdgs) ? selectedSdgs : [selectedSdgs];

    // Find the SDG objects based on selected IDs
    const selectedSdgObjects = selectedSdgsArray.map(sdgId => sdgData.data.find(sdg => sdg.id == sdgId));

    // Render the score-form with selected SDGs
    response.render('score-form', {
        selectedSdgs: selectedSdgObjects,
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    });
});

// POST routes ---------------------------------------------------
app.post('/gegevens-form/:stakeholder_type', function (request, response) {
})

app.post('/sdg', function (request, response) {
})

// PUT routes ----------------------------------------------------
app.put('/score-form/:sdg_id', function (request, response) {
})

app.post('/done-form', function(req, res) {
    // Haal de waarden op uit req.body
    const selectSdgs = req.body;
    // Doe iets met de waarden, zoals opslaan in een database, en render de done-form.ejs-pagina opnieuw
    res.render('done-form', { selectSdgs: selectSdgs });
});