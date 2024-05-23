// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }))

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8009)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items'

const sdgData = await fetchJson(apiUrl + '/hf_sdgs'),
    stakeholdersData = await fetchJson(apiUrl + '/hf_stakeholders?filter={"company_id":4}'),
    scoresData = await fetchJson(apiUrl + '/hf_scores'),
    companiesData = await fetchJson(apiUrl + '/hf_companies/4')

console.log(companiesData.data.name)

app.get('/', function (request, response) {
    response.render('index', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})

app.get('/dashboard', function (request, response) {
    response.render('dashboard', {
        sdgs: sdgData.data,
        stakeholder: stakeholdersData.data,
        score: scoresData.data,
        company: companiesData.data,
    })
})
