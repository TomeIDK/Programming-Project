document.addEventListener('DOMContentLoaded', function () {
    function switchContent(input) {
        const contentSection = document.getElementById('content-section');

        if (input === 'reservatie') {
            contentSection.innerHTML = `
                <h3>Reservatie Beheer</h3>
                <p>Startdatum reservatie: 2024-05-16</p>
                <p>Einddatum reservatie: 2024-05-20</p>
                <form id="reservatie-form">
                    <br>
                    <button id="reservatie-annuleren" class="btn cta-button--red">Annuleren</button>
                </form>
            `;
        } else if (input === 'lening') {
            contentSection.innerHTML = `
                <h3>Lening Beheer</h3>
                <p>Startdatum lening: 2024-05-16</p>
                <p>Einddatum lening: 2024-05-20</p>
                <form id="lening-form">
                    <br>
                    <button id="lening-annuleren" class="btn cta-button--red">Annuleren</button>
                    <button id="lening-verlengen" class="btn secondary-button">Verlengen</button><br>
                    <br>
                    <label for="schade">Heeft dit product schade opgelopen bij deze lening?</label><br>
                    <input type="radio" id="schade-ja" name="schade" value="Ja">
                    <label for="schade-ja">Ja</label><br>
                    <input type="radio" id="schade-nee" name="schade" value="Nee">
                    <label for="schade-nee">Nee</label><br>
                    <label for="extra-commentaar">Extra commentaar schade:</label><br>
                    <textarea id="extra-commentaar" name="extra-commentaar" rows="4" cols="50"></textarea><br>
                    <br>
                    <button type="submit" class="btn cta-button--blue">Opslaan</button>
                </form>
            `;
        }
    }

    let input = 'lening';
    switchContent(input);

    // Voeg hier de event listener voor de Annuleren-knop toe
    document.addEventListener('click', function (event) {
        if (event.target.matches('#lening-annuleren') || event.target.matches('#reservatie-annuleren')) {
            event.preventDefault();
            document.getElementById('confirmModalAnnuleren').style.display = 'block';
        } else if (event.target.matches('#lening-verlengen')) {
            event.preventDefault();
            document.getElementById('confirmModalVerlengen').style.display = 'block';
        }
    });

    document.getElementById('confirmYesAnnuleren').addEventListener('click', function () {
        document.getElementById('confirmModalAnnuleren').style.display = 'none';
        alert('Reservering geannuleerd.'); // Vervang dit met de daadwerkelijke annuleringslogica
    });

    document.getElementById('confirmNoAnnuleren').addEventListener('click', function () {
        document.getElementById('confirmModalAnnuleren').style.display = 'none';
    });

    document.getElementById('confirmYesVerlengen').addEventListener('click', function () {
        document.getElementById('confirmModalVerlengen').style.display = 'none';
        alert('Lening verlengd.'); // Vervang dit met de daadwerkelijke verlengingslogica
    });

    document.getElementById('confirmNoVerlengen').addEventListener('click', function () {
        document.getElementById('confirmModalVerlengen').style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target === document.getElementById('confirmModalAnnuleren')) {
            document.getElementById('confirmModalAnnuleren').style.display = 'none';
        } else if (event.target === document.getElementById('confirmModalVerlengen')) {
            document.getElementById('confirmModalVerlengen').style.display = 'none';
        }
    }
});
