class Cities {
    constructor() {
        this.API_URL = 'https://geo.api.gouv.fr/communes?codePostal='
        this.postal_code_input = document.querySelector('.js-postalCodeInput')
        this.postal_code_button = document.querySelector('.js-postalCodeButton')
        this.citiesResultNumber = document.querySelector('.js-citiesResultNumber')
        this.cities_list = document.querySelector('.js-citiesList')
        this.postal_code = '39300'
        this.cities = [];
    }


    /**
     * Initialisation du module
     * @return {void}
     */
    init() {
        if (!this.canBeRun()) {
            console.console.warn('Un des éléments html n\'est pas présent')
            return
        }

        this.run();
    }

    /**
     * Mise en route du module
     * @return {void}
     */
    run() {

        this.getData();

        this.postal_code_button.addEventListener('click', () => {
            
            // this.hasPostalCode();
            if (this.hasPostalCode()) {
                alert('Vous devez saisir un code postal')
                return
            }

            this.postal_code = this.postal_code_input.value
            this.getData();
        })
    }

    /**
     * Récupère la liste des communes
     * @return {void}
     */
    async getData() {
        const response = await fetch(this.API_URL + this.postal_code)
        const data = await response.json();

        this.cities_list.innerText = '';
        
        if (response.ok) {
            this.cities = data
            this.displayCities()
        }
    }

    /**
     * Affiche les villes
     */
    displayCities() {

        this.citiesResultNumber.innerText = this.cities.length

        this.cities.forEach(city => {
            const article = document.createElement('article')
            article.classList.add('cities-item')
            const h2 = document.createElement('h2')
            h2.classList.add('cities-title', 'title')
            h2.innerText = city.nom
            const span = document.createElement('span')
            span.classList.add('cities-population')
            span.innerText = city.population + ' habitants'

            article.appendChild(h2)
            article.appendChild(span)

            this.cities_list.appendChild(article)

        })
    }

    /**
     * Vérifie qu'il y a une valeur dans l'input
     * @return {boolean}
     */
    hasPostalCode() {
        return this.postal_code_input.value === ''
    }

    /**
     * Check si les élément HTML nécéssaires au module sont présents dans le DOM
     * @return {boolean}
     */
    canBeRun() {
        if (!this.postal_code_input || !this.postal_code_button || !this.cities_list || !this.citiesResultNumber) {
            return false
        }
        return true
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Cities().init();
})