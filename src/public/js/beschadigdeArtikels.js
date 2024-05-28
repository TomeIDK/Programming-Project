document.addEventListener('DOMContentLoaded', function() {
    const damagedArticles = [
        { id: 1, name: 'Artikel 1', description: 'Beschrijving van artikel 1', status: 'Beschadigd' },
        { id: 2, name: 'Artikel 2', description: 'Beschrijving van artikel 2', status: 'Beschadigd' },
        { id: 3, name: 'Artikel 3', description: 'Beschrijving van artikel 3', status: 'Beschadigd' },
        { id: 4, name: 'Artikel 4', description: 'Beschrijving van artikel 4', status: 'Beschadigd' },
        // Voeg hier meer beschadigde artikelen toe
    ];

    const tbody = document.querySelector('#damagedArticlesTable tbody');

    damagedArticles.forEach(article => {
        const tr = document.createElement('tr');
        tr.classList.add('damaged');
        
        tr.innerHTML = `
            <td>${article.id}</td>
            <td>${article.name}</td>
            <td>${article.description}</td>
            <td>${article.status}</td>
        `;
        tbody.appendChild(tr);
    });
});